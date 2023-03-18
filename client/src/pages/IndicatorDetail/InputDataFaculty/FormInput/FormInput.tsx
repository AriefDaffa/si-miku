import * as yup from 'yup';
import moment from 'moment';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { DatePicker } from '@mui/x-date-pickers';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import useInputIndicatorDataFacultyMutation from '@/repository/mutation/InputIndicatorDataFacultyMutation';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { useYupValidationResolver } from '@/hooks/use-yup-validation-resolver';
import type { IndicatorMutationData } from '@/repository/mutation/InputIndicatorDataFacultyMutation';

interface FormInputProps {
  indicatorID: number;
}

const FormInput: FC<FormInputProps> = (props) => {
  const { indicatorID } = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

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
      year_value: moment('2019').toDate(),
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target_value: 0,
    },
    resolver,
  });

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useInputIndicatorDataFacultyMutation();

  const handleOnClick = (data: IndicatorMutationData) => {
    setLoading(true);
    mutate(
      {
        indicator_id: indicatorID,
        indicator_faculty_data: [
          {
            q1: data.q1,
            q2: data.q2,
            q3: data.q3,
            q4: data.q4,
            target_value: data.target_value,
            year_value: moment(data.year_value).year(),
          },
        ],
      },
      {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setLoading(false);
            setSuccessDialog(true);
          }

          queryClient.invalidateQueries(['indicator', String(indicatorID)]);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Input Form" />
      </Box>
      <Divider sx={{ my: 2 }} />
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
        {isError && <Alert severity="error">{String(error || '')}</Alert>}
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

export default FormInput;
