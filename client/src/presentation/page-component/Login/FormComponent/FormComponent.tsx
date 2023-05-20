import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, Control } from 'react-hook-form';
import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import logo from '@/assets/logo/logo.png';
import Grid from '@/presentation/global-component/UI/Grid';
import Helmet from '@/presentation/global-component/UI/Helmet';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import { ERROR, PRIMARY } from '@/presentation/global-component/theme/Colors';

interface FormComponentProps {
  isError: boolean;
  error: unknown;
  control: Control<any, any>;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { control, isError, error } = props;

  return (
    <Grid
      sx={{ py: 2 }}
      gridItem={[
        <Controller
          name="user_email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type="email"
              error={fieldState.error ? true : false}
              label={'Email Address'}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />,
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type="password"
              error={fieldState.error ? true : false}
              label={'Password'}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />,
        isError && <Alert severity="error">Error: {String(error || '')}</Alert>,
      ]}
    />
  );
};

export default FormComponent;
