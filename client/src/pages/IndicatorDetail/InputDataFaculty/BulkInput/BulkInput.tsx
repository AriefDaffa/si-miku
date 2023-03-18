import { useState } from 'react';
import { read, utils } from 'xlsx';
import { useQueryClient } from 'react-query';
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
import useInputIndicatorDataFacultyMutation from '@/repository/mutation/InputIndicatorDataFacultyMutation';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

import { SheetJSFT } from './constant';

interface BulkInputProps {
  indicatorID: number;
}

const BulkInput: FC<BulkInputProps> = (props) => {
  const { indicatorID } = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentFile, setCurrentFile] = useState<any[]>([]);
  const [fileName, setFileName] = useState('Browse file');
  const [inputKey, setInputKey] = useState('');
  const [excelError, setExcelError] = useState('');

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useInputIndicatorDataFacultyMutation();

  // @TODO Validate duplicate year
  const onSubmit = () => {
    const normalizeRequest = {
      indicator_id: indicatorID,
      indicator_faculty_data: currentFile.map((item) => {
        // file validation before upload
        const { q1, q2, q3, q4, target_value, year_value } = item;

        // check missing field
        if (!q1 || !q2 || !q3 || !q4 || !target_value || !year_value) {
          setExcelError(
            'Error! Terdapat missing field, cek kembali file excel sebelum melakukan upload!'
          );
        } else if (year_value.toString().length !== 4) {
          // validate year value
          setExcelError(
            `Error! Value tahun '${year_value}' tidak valid, silahkan masukkan value yang valid! `
          );
        } else if (
          typeof q1 !== 'number' ||
          typeof q2 !== 'number' ||
          typeof q3 !== 'number' ||
          typeof q4 !== 'number' ||
          typeof target_value !== 'number' ||
          typeof year_value !== 'number'
        ) {
          // validate is value number
          setExcelError(
            `Error! Terdapat value string pada file. Pastikan value yang dimasukkan adalah angka!`
          );
        } else {
          setLoading(true);
          setExcelError('');
        }

        return item;
      }),
    };

    if (excelError === '') {
      mutate(normalizeRequest, {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setSuccessDialog(true);
            setLoading(false);
            removeCurrentFile();
          }

          queryClient.invalidateQueries(['indicator', String(indicatorID)]);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
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
        header: ['no', 'year_value', 'q1', 'q2', 'q3', 'q4', 'target_value'],
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
            <Button variant="outlined" component="label">
              Browse File
              <input
                hidden
                type="file"
                key={inputKey || ''}
                accept={SheetJSFT}
                onChange={handleChange}
              />
            </Button>
          </Stack>
        </Stack>
        {excelError !== '' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {excelError}
          </Alert>
        )}
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
        <form action={`${import.meta.env.VITE_BASE_API_URL}template/fakultas`}>
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
