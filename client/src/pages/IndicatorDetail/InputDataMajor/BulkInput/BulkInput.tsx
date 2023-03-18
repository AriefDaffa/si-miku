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
import InputIndicatorDataMajorMutation from '@/repository/mutation/InputIndicatorDataMajorMutation';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import type { IndicatorMutationTypes } from '@/repository/mutation/InputIndicatorDataMajorMutation';

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
  const { mutate, isError, error } = InputIndicatorDataMajorMutation();

  const onSubmit = () => {
    const payload: IndicatorMutationTypes = {
      indicator_id: indicatorID,
      indicator_major_data: [],
    };

    currentFile.map((item, idx) => {
      payload.indicator_major_data.push({
        major_id: item.major_id,
        major_data: item.major_data.map((data: any) => {
          return {
            q1: data.q1,
            q2: data.q2,
            q3: data.q3,
            q4: data.q4,
            year_value: data.year_value,
            target_value: data.target_value,
          };
        }),
      });
    });

    if (payload.indicator_major_data.length < 6) {
      setExcelError('Error! Terdapat sheet yang hilang!');
      return;
    }

    for (let i = 0; i < payload.indicator_major_data.length; i++) {
      let isBreak = false;
      for (
        let j = 0;
        j < payload.indicator_major_data[i].major_data.length;
        j++
      ) {
        const currentData = payload.indicator_major_data[i].major_data[j];

        const { q1, q2, q3, q4, target_value, year_value } = currentData;

        if (!q1 || !q2 || !q3 || !q4 || !target_value || !year_value) {
          isBreak = true;
          setExcelError(
            'Error! Terdapat missing field, cek kembali file excel sebelum melakukan upload!'
          );
          break;
        } else if (year_value.toString().length !== 4) {
          // validate year value
          isBreak = true;
          setExcelError(
            `Error! Value tahun '${year_value}' tidak valid, silahkan masukkan value yang valid! `
          );
          break;
        } else if (
          typeof q1 !== 'number' ||
          typeof q2 !== 'number' ||
          typeof q3 !== 'number' ||
          typeof q4 !== 'number' ||
          typeof target_value !== 'number' ||
          typeof year_value !== 'number'
        ) {
          // validate value number
          isBreak = true;
          setExcelError(
            `Error! Terdapat value string pada file. Pastikan value yang dimasukkan adalah angka!`
          );
          break;
        }
        setLoading(true);
        setExcelError('');
      }

      if (isBreak) break;
    }

    if (excelError === '') {
      mutate(payload, {
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

      let temp_arr: any[] = [];

      for (let i = 0; i < wb.SheetNames.length; i++) {
        const wsname = wb.SheetNames[i];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, {
          header: ['no', 'year_value', 'q1', 'q2', 'q3', 'q4', 'target_value'],
          range: 1,
        });

        temp_arr.push({
          major_id: i + 1,
          major_data: data,
        });
      }

      setCurrentFile(temp_arr);
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
