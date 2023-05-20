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

import Card from '@/presentation/global-component/UI/Card';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import useAddIndicatorMutation from '@/repository/mutation/indicator/AddIndicatorMutation';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

import { SheetJSFT } from './constant';

interface BulkInputControllerProps {}

const BulkInputController: FC<BulkInputControllerProps> = (props) => {
  const {} = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentFile, setCurrentFile] = useState<any[]>([]);
  const [fileName, setFileName] = useState('Browse file');
  const [inputKey, setInputKey] = useState('');
  const [excelError, setExcelError] = useState('');

  const { mutate, isError, error } = useAddIndicatorMutation();

  const onSubmit = () => {
    const payload = {
      indicator_list: currentFile.map((item) => {
        const {
          indicator_code,
          indicator_name,
          supervised_by,
          indicator_data_type,
        } = item;

        return {
          indicator_code: String(indicator_code),
          indicator_name,
          supervised_by: Number(supervised_by),
          indicator_data_type: Number(indicator_data_type),
        };
      }),
    };

    for (let i = 0; i < payload.indicator_list.length; i++) {
      const { indicator_code, indicator_name, supervised_by } =
        payload.indicator_list[i];

      // cek format indicator code
      const splittedCode: any = indicator_code
        .split('.')
        .filter((item: any) => /\S/.test(item));
      let validated = false;

      for (let j = 0; j < splittedCode.length; j++) {
        const numberedValue = Number(splittedCode[j]);

        if (isNaN(numberedValue)) {
          validated = true;
          break;
        }
      }

      if (!indicator_code || !indicator_name) {
        setExcelError(
          'Error! Terdapat missing field, cek kembali file excel sebelum melakukan upload!'
        );
        break;
      } else if (validated) {
        setExcelError(
          'Error! Terdapat kesalahan format kode indikator, silahkan cek kembali!'
        );
        break;
      } else if (isNaN(supervised_by)) {
        setExcelError(
          'Error! Terdapat kesalahan format pada field supervisor, silahkan cek kembali!'
        );
        break;
      } else if (
        indicator_code === '' ||
        indicator_name === '' ||
        supervised_by === null
      ) {
        setExcelError(
          'Error! Terdapat field kosong pada file, silahkan cek kembali!'
        );
        break;
      } else {
        setExcelError('');
        setLoading(true);
      }
    }

    // console.log(payload);

    mutate(payload, {
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
      const wsname = wb.SheetNames[1];
      const ws = wb.Sheets[wsname];
      // console.log(rABS, wb);
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, {
        header: [
          'no',
          'indicator_code',
          'indicator_name',
          'supervised_by',
          'indicator_data_type',
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
    setExcelError('');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Header text="Tambah Indikator Baru (Bulk)" />
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

export default BulkInputController;
