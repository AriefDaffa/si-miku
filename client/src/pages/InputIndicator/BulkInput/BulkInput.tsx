import { useState } from 'react';
import { read, utils } from 'xlsx';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@/components/UI/atoms/Card';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useInputIndicatorBulkMutation from '@/repository/mutation/InputIndicatorBulkMutation';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

import { SheetJSFT } from './constant';
import baseAPI from '@/utils/axios-utils';

interface BulkInputProps {}

const BulkInput: FC<BulkInputProps> = (props) => {
  const {} = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentFile, setCurrentFile] = useState<any[]>([]);
  const [fileName, setFileName] = useState('Browse file');
  const [inputKey, setInputKey] = useState('');

  const { mutate, isError, error } = useInputIndicatorBulkMutation();

  const onSubmit = () => {
    setLoading(true);

    // @TODO add validation sesuai template atau tidak
    const normalizeRequest = {
      indicator: currentFile.map((item) => {
        return {
          indicator_code: String(item.indicator_code),
          indicator_name: item.indicator_name,
          is_faculty_indicator:
            item.is_faculty_indicator === 'Fakultas' ? true : false,
        };
      }),
    };

    mutate(normalizeRequest, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setSuccessDialog(true);
          setLoading(false);
          removeCurrentFile();
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  const handleFile = (file: any) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e: any) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // console.log(rABS, wb);
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, {
        header: [
          'no',
          'indicator_code',
          'indicator_name',
          'is_faculty_indicator',
        ],
        range: 1,
      });
      /* Update state */
      setCurrentFile(data);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleChange = (e: any) => {
    const files = e.target.files;

    if (files && files[0]) {
      handleFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const removeCurrentFile = () => {
    setInputKey(Math.random().toString(36));
    setCurrentFile([]);
    setFileName('Browse file');
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Bulk Input" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ my: 2 }}>
        <SubHeader text="Upload file" sx={{ pb: 1 }} />
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction={{ sm: 'row' }}
          sx={{
            border: '1px dashed #a7a7a7',
            display: 'flex',
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          <Header text={fileName} variant="body2" />
          <Stack flexDirection="row">
            {currentFile.length > 0 && (
              <IconButton onClick={removeCurrentFile}>
                <DeleteIcon />
              </IconButton>
            )}
            <Button variant="outlined">
              <label htmlFor="file-id">Browse File</label>
            </Button>
            <input
              type="file"
              id="file-id"
              key={inputKey || ''}
              accept={SheetJSFT}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </Stack>
        </Stack>
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {String(error || '')}
          </Alert>
        )}
      </Box>
      <Divider />
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        <form action={`${import.meta.env.VITE_BASE_API_URL}template`}>
          <Button variant="contained" type="submit" color="success">
            Download template
          </Button>
        </form>
        <Button
          variant="contained"
          disabled={!currentFile.length}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Stack>
      <DialogPopup
        title="Success!"
        bodyText="Indikator berhasil ditambahkan"
        buttonText=""
        handleClose={setCloseDialog}
        handleAccept={setCloseDialog}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </Card>
  );
};

export default BulkInput;
