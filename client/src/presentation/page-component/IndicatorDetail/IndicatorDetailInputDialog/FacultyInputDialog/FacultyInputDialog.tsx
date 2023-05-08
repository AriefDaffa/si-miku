import * as yup from 'yup';
import moment from 'moment';
import { useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';

import Grid from '@/presentation/global-component/UI/Grid';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import YearPicker from '@/presentation/global-component/UI/YearPicker/YearPicker';
import useInputDataFacultyMutation from '@/repository/mutation/faculty/InputDataFacultyMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface FacultyInputDialogProps {
  open: boolean;
  indicatorID: number;
  indicatorName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FacultyInputDialog: FC<FacultyInputDialogProps> = (props) => {
  const { open, setOpen, indicatorName, indicatorID } = props;

  const schema = yup.object().shape({
    q1: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q2: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q3: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q4: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    target_value: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const [selectedYear, setSelectedYear] = useState('2017');
  const [successDialog, setSuccessDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } = useInputDataFacultyMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target_value: 0,
    },
    resolver,
  });

  const handleOnSubmit = (data: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    target_value: number;
  }) => {
    const { q1, q2, q3, q4, target_value } = data;

    const year_value = Number(selectedYear);

    if (Number.isNaN(year_value)) {
      return;
    }

    const payload = {
      indicator_id: indicatorID,
      indicator_data: {
        q1,
        q2,
        q3,
        q4,
        target_value,
        year_value,
      },
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);

          queryClient.invalidateQueries({
            queryKey: ['indicator', String(indicatorID)],
          });
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  const handleSelectYear = useCallback((year: string | null) => {
    if (year !== null) {
      setSelectedYear(String(moment(year).year()));
    }
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Stack
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ my: 1 }}
          >
            <CreateIcon />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <TextWithSubHeader
              header={indicatorName}
              subHeader="Input Data Indikator"
            />
          </Stack>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack gap={2} sx={{ my: 2 }}>
              <Grid
                gridItem={[
                  <Box>
                    <SubHeader text="Pilih tahun" sx={{ pb: 1 }} />
                    <YearPicker
                      yearValue={selectedYear}
                      handleSelectYear={handleSelectYear}
                    />
                  </Box>,
                ]}
              />
              <Grid
                spacing={2}
                sm={[3, 3, 3, 3]}
                gridItem={[
                  <Controller
                    name="q1"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Data Kuarter 1" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="number"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="q2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Data Kuarter 2" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="number"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="q3"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Data Kuarter 3" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="number"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="q4"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Data Kuarter 4" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="number"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                ]}
              />
              <Grid
                sm={[6]}
                gridItem={[
                  <Controller
                    name="target_value"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader
                          text="Data Target Indikator"
                          sx={{ pb: 1 }}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                ]}
              />
              {isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {String(error || '')}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Success! Data indikator berhasil ditambahkan
                </Alert>
              )}
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  float: 'right',
                  mt: 2,
                  backgroundColor: PRIMARY.main,
                  ':hover': { backgroundColor: PRIMARY.light },
                }}
              >
                {false ? 'Loading...' : 'Submit'}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <DialogPopup
        title="Success"
        bodyText="Indikator berhasil diubah"
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </>
  );
};

export default FacultyInputDialog;
