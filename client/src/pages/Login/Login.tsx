import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import logo from '@/assets/logo/logo.png';
import Grid from '@/components/UI/atoms/Grid';
import Helmet from '@/components/UI/atoms/Helmet';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { ERROR, PRIMARY } from '@/presentation/global-component/theme/Colors';
import { useLoginMutation } from '@/repository/mutation/auth/LoginMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import type { LoginData } from './types';

const Login: FC = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    user_email: yup
      .string()
      .email('Value tidak valid!')
      .required('Email tidak boleh kosong!'),
    password: yup.string().required('Password tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_email: '',
      password: '',
    },
    resolver,
  });

  const navigate = useNavigate();
  const { mutate, isError, error, isLoading } = useLoginMutation();

  const onSubmit = (data: LoginData) => {
    setLoading(true);
    mutate(data, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          navigate('/');
          setLoading(false);
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Helmet title="Login | SI-MIKU" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 2 }}>
              <img src={logo} alt="" />
              <Typography color="textPrimary" variant="h4" sx={{ pt: 4 }}>
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in to access the dashboard
              </Typography>
            </Box>
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
                isError && (
                  <Alert severity="error">Error: {String(error || '')}</Alert>
                ),
              ]}
            />
            <Box sx={{ py: 3 }}>
              <Button
                color="primary"
                disabled={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: PRIMARY.main,
                  ':hover': { backgroundColor: PRIMARY.light },
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>
          <LoadingPopup open={loading} />
        </Container>
      </Box>
    </>
  );
};

export default Login;
