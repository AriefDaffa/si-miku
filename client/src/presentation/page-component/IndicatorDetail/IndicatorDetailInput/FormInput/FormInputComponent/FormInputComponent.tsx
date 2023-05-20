import { Control, Controller } from 'react-hook-form';
import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

import Grid from '@/presentation/global-component/UI/Grid';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface FormInputComponentProps {
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  control: Control<any, any>;
  PickerComponent: ReactNode;
  YearPickerComponent: ReactNode;
}

const FormInputComponent: FC<FormInputComponentProps> = (props) => {
  const {
    error,
    isError,
    isSuccess,
    control,
    PickerComponent,
    YearPickerComponent,
  } = props;

  return (
    <Stack gap={2} sx={{ my: 2 }}>
      <Grid
        sm={[6, 6]}
        gridItem={[
          <Box>
            <SubHeader text="Pilih Program Studi" sx={{ pb: 1 }} />
            {PickerComponent}
          </Box>,
          <Box>
            <SubHeader text="Pilih tahun" sx={{ pb: 1 }} />
            {YearPickerComponent}
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
                <SubHeader text="Data Target Indikator" sx={{ pb: 1 }} />
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
        // color={`${PRIMARY.main}`}
        size="large"
        type="submit"
        variant="contained"
        // disabled={isLoading}
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
  );
};

export default FormInputComponent;
