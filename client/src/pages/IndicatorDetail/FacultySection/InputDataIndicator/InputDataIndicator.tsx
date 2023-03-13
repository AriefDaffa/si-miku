import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';

import Grid from '@/components/UI/atoms/Grid';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useInputIndicatorDataMutation from '@/repository/mutation/InputIndicatorDataMutation';
import { useYupValidationResolver } from '@/hooks/use-yup-validation-resolver';
import type { IndicatorMutationData } from '@/repository/mutation/InputIndicatorDataMutation';

interface InputDataIndikatorProps {
  indicatorID: number;
}

const InputDataIndikator: FC<InputDataIndikatorProps> = (props) => {
  const { indicatorID } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useInputIndicatorDataMutation();

  const schema = yup.object().shape({
    year_value: yup.date().required('Tahun tidak boleh kosong'),
    q1: yup.number().required('Field tidak boleh kosong!'),
    q2: yup.number().required('Field tidak boleh kosong!'),
    q3: yup.number().required('Field tidak boleh kosong!'),
    q4: yup.number().required('Field tidak boleh kosong!'),
    target_value: yup.number().required('Target tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      year_value: 2020,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target_value: 0,
    },
    resolver,
  });

  const handleOnClick = (data: IndicatorMutationData) => {
    setLoading(true);
    mutate(
      {
        indicator_id: indicatorID,
        indicator_faculty_data: [data],
      },
      {
        onSuccess: () => {
          setLoading(false);
          setOpenDialog(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Input Data Indikator
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Tambah data indikator</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleOnClick)}>
            <Box sx={{ py: 2 }}>
              <Grid
                spacing={2}
                sm={[6, 6, 3, 3, 3, 3, 6]}
                gridItem={[
                  <Controller
                    name="year_value"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        label="Tahun"
                        views={['year']}
                        openTo={'year'}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            error={fieldState.error ? true : false}
                            helperText={fieldState.error?.message}
                            {...params}
                          />
                        )}
                        {...field}
                      />
                    )}
                  />,
                  <Controller
                    name="target_value"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="number"
                        error={fieldState.error ? true : false}
                        label={'Target'}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />,
                  <Controller
                    name="q1"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="number"
                        error={fieldState.error ? true : false}
                        label={'Q1'}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />,
                  <Controller
                    name="q2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="number"
                        error={fieldState.error ? true : false}
                        label={'Q2'}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />,
                  <Controller
                    name="q3"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="number"
                        error={fieldState.error ? true : false}
                        label={'Q3'}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />,
                  <Controller
                    name="q4"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="number"
                        error={fieldState.error ? true : false}
                        label={'Q4'}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />,
                ]}
              />
            </Box>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              // disabled={isLoading}
              sx={{ float: 'right', mt: 2 }}
            >
              {false ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* <DialogPopup
        title="Success"
        bodyText="Indikator berhasil diubah"
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      /> */}
      <LoadingPopup open={loading} />
    </Box>
  );
};

export default InputDataIndikator;
