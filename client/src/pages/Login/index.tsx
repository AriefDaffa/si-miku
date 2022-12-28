import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import type { FC } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { useLoginMutation } from '@/repository/LoginMutation';

import type { LoginData } from './types';

const Login: FC = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginMutation();

  const onSubmit = (data: LoginData) => {
    mutate(data, {
      onSuccess: (data) => {
        navigate('/');
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | SI-Miku</title>
      </Helmet>
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
            <Box sx={{ my: 1 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in to access the dashboard
              </Typography>
            </Box>
            <Controller
              name="user_email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  autoComplete="on"
                />
              )}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
