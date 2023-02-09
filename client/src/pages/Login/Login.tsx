import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useLoginMutation } from '@/repository/mutation/LoginMutation';
import { TextInput } from '@/components/Input';
import logo from '@/assets/logo/logo.png';
import CustomGrid from '@/components/CustomGrid';
import Helmet from '@/components/Helmet';

import type { LoginData } from './types';

// @TODO Add error handling
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
      onSuccess: () => {
        navigate('/');
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
            <CustomGrid
              gridItem={[
                <TextInput
                  control={control}
                  label="Email Address"
                  name="user_email"
                  type="text"
                />,
                <TextInput
                  control={control}
                  label="Password"
                  name="password"
                  type="password"
                />,
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
