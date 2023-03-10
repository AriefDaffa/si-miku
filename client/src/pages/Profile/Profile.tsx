import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';
import { Header, PageTitle, SubHeader } from '@/components/UI/atoms/Typography';
import { useAuthContext } from '@/context/AuthContext';
import { useYupValidationResolver } from '@/hooks/use-yup-validation-resolver';
import { UserData } from './types';

// @TODO Add mutation
const Profile: FC = () => {
  const { isManagement } = useAuthContext();
  const { data, isLoading } = useCurrentUserQuery();

  const schema = yup.object().shape({
    user_name: yup.string().required('User Name tidak boleh kosong!'),
    user_email: yup
      .string()
      .email('Masukkan format email yang valid!')
      .required('Email tidak boleh kosong!'),
    // password: yup
    //   .string()
    //   .min(8, 'Password kurang dari 8')
    //   .required('Password tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_name: data.userName,
      user_email: data.email,
      user_image: data.userImage,
    },
    resolver,
  });

  const onSubmit = (data: UserData) => {
    console.log(data);
  };

  return (
    <>
      <Helmet title="Profile | SI-MIKU" />
      <Container>
        <PageTitle title="Profile" subTitle="Menampilkan profile pengguna" />
        <Card>
          <Header text="Edit profile" />
          <SubHeader
            text="Ubah informasi di bawah untuk mengubah profile"
            sx={{ mb: 4 }}
          />
          <Stack
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box>
              <Avatar
                src={data.userImage}
                alt=""
                sx={{
                  width: 200,
                  height: 200,
                }}
              />
            </Box>
            <Box>
              <SubHeader
                text="*Klik pada gambar untuk melakukan upload file"
                sx={{
                  textAlign: 'center',
                  my: 2,
                  fontStyle: 'italic',
                  opacity: 0.5,
                }}
              />
              <Header
                text={`Role: ${isManagement ? 'Management' : 'Operator'}`}
                sx={{ textAlign: 'center', my: 2 }}
              />
            </Box>
            <Box>
              <Divider sx={{ mx: 4 }} />
            </Box>
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  gridItem={[
                    <Controller
                      name="user_name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          fullWidth
                          type="text"
                          error={fieldState.error ? true : false}
                          label={'User Name'}
                          helperText={fieldState.error?.message}
                          //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                          {...field}
                        />
                      )}
                    />,
                    <Controller
                      name="user_email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          fullWidth
                          disabled
                          type="email"
                          error={fieldState.error ? true : false}
                          label={'Email'}
                          helperText={fieldState.error?.message}
                          //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                          {...field}
                        />
                      )}
                    />,
                  ]}
                />
                <Box sx={{ float: 'right', py: 2 }}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
