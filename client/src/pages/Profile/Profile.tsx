import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import type { FC, ChangeEvent } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import AvatarTitle from '@/components/UI/organism/AvatarTitle';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import useUpdateUserProfileMutation from '@/repository/mutation/UpdateUserProfileMutation';
import { useCurrentUserQuery } from '@/repository/query/user/CurrentUserQuery';
import { Header, PageTitle, SubHeader } from '@/components/UI/atoms/Typography';
import { useAuthContext } from '@/controller/context/AuthContext';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import { ERROR, PRIMARY } from '@/presentation/global-component/theme/Colors';

import type { UserData } from './types';

const Profile: FC = () => {
  const { isManagement } = useAuthContext();
  const { data, isLoading } = useCurrentUserQuery();

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentImage, setcurrentImage] = useState<any>('');
  const [inputKey, setInputKey] = useState('');

  const schema = yup.object().shape({
    user_name: yup.string().required('User Name tidak boleh kosong!'),
    user_email: yup
      .string()
      .email('Masukkan format email yang valid!')
      .required('Email tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      user_name: data.userName,
      user_email: data.email,
    },
    resolver,
  });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfileMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;

    if (image && image[0]) {
      setcurrentImage(image[0]);
    }
  };

  const handleRemoveImage = () => {
    setcurrentImage('');
    setInputKey(Math.random().toString(36));
  };

  const onSubmit = (data: UserData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('user_name', data.user_name);
    formData.append('user_email', data.user_email);
    formData.append('profile-image', currentImage);

    mutate(formData, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setSuccessDialog(true);
          setLoading(false);
        }

        queryClient.invalidateQueries('currentUser');
      },
      onError: (err) => {
        setLoading(false);
        console.log(err);
      },
    });
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  // fix missing value on refresh
  useEffect(() => {
    if (!isLoading && getValues().user_name === '') {
      setValue('user_name', data.userName);
      setValue('user_email', data.email);
    }

    if (data.userImage !== '') {
      setcurrentImage(data.userImage);
    }
  }, [isLoading]);

  return (
    <>
      <Helmet title="Profile | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle title="Profile" subTitle="Menampilkan profile pengguna" />
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AvatarTitle
              isImageIcon
              Icon={AccountBoxIcon}
              imageURL=""
              header="Profile pengguna"
              subHeader="Edit"
            />
            <Stack
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Box>
                <Avatar
                  src={
                    typeof currentImage === 'string'
                      ? currentImage
                      : URL.createObjectURL(currentImage)
                  }
                  alt=""
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                />
              </Box>
              <Stack
                justifyContent="center"
                direction={{ sm: 'row' }}
                sx={{ py: 2, gap: 2 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  sx={{
                    border: 2,
                    borderColor: PRIMARY.main,
                    color: PRIMARY.main,
                    ':hover': { border: 2, borderColor: PRIMARY.light },
                  }}
                >
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    key={inputKey || ''}
                    onChange={handleImageChange}
                  />
                </Button>
                <Button
                  variant="outlined"
                  // color="error"
                  onClick={handleRemoveImage}
                  disabled={currentImage === ''}
                  startIcon={<DeleteIcon />}
                  sx={{
                    border: 2,
                    borderColor: ERROR.main,
                    color: ERROR.main,
                    ':hover': { borderColor: ERROR.light },
                  }}
                >
                  Delete Image
                </Button>
              </Stack>
              <Box>
                <Header
                  text={`Role: ${isManagement ? 'Management' : 'Operator'}`}
                  sx={{ textAlign: 'center', my: 2 }}
                />
              </Box>
              <Box>
                <Divider sx={{ mx: 4 }} />
              </Box>
              <Box sx={{ width: '100%', maxWidth: 600 }}>
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
                          {...field}
                        />
                      )}
                    />,
                  ]}
                />
                <Box sx={{ float: 'right', py: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: PRIMARY.main,
                      ':hover': { backgroundColor: PRIMARY.light },
                    }}
                  >
                    Submit
                  </Button>
                </Box>

                <DialogPopup
                  title="Success!"
                  bodyText="Profile berhasil diubah"
                  buttonText=""
                  handleClose={setCloseDialog}
                  handleAccept={setCloseDialog}
                  open={successDialog}
                />
                <LoadingPopup open={loading} />
              </Box>
            </Stack>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
