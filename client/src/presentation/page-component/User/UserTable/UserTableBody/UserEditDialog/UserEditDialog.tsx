import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import type {
  FC,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  ChangeEvent,
} from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@/presentation/global-component/UI/Grid';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle';
import ProfileImage from '@/presentation/page-component/Profile/ProfileImage';
import ProfileButton from '@/presentation/page-component/Profile/ProfileButton';
import useEditUserMutation from '@/repository/mutation/user/EditUserMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { UserListNormalized } from '@/repository/query/user/UserQuery';

import type { UserEdit } from './types';

interface UserEditDialogProps extends UserListNormalized {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UserEditDialog: FC<UserEditDialogProps> = (props) => {
  const { open, setOpen, ...rest } = props;

  const [currentImage, setcurrentImage] = useState<any>('');
  const [inputKey, setInputKey] = useState('');
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    profession: yup.string().required('Field tidak boleh kosong!'),
    user_email: yup.string().required('Field tidak boleh kosong!'),
    password: yup
      .string()
      .min(8, 'Password kurang dari 8 karakter')
      .required('Field tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } = useEditUserMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      profession: rest.profession,
      user_email: rest.userEmail,
      role_id: String(rest.role.roleID),
      password: '',
    },
    resolver,
  });

  const handleOnSubmit = (data: UserEdit) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('profile-image', currentImage);
    formData.append('user_email', data.user_email);
    formData.append('profession', data.profession);
    formData.append('password', data.password);
    formData.append('role_id', data.role_id);

    mutate(
      { id: rest.userID, data: formData },
      {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setLoading(false);
            queryClient.invalidateQueries({
              queryKey: 'user',
            });
          }
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

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

  useEffect(() => {
    if (rest.userImage !== '') {
      setcurrentImage(rest.userImage);
    }
  }, [rest.userImage]);

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
          <Grid
            sm={[12]}
            gridItem={[
              <AvatarTitle
                isImageIcon
                imageURL=""
                Icon={EditIcon}
                subHeader="Edit"
                header="Informasi User"
              />,
            ]}
          />
          <Divider sx={{ my: 2 }} />

          {/* IMAGE SECTION */}
          <Stack justifyContent="center" alignItems="center">
            <Box>
              <ProfileImage currentImage={currentImage} />
            </Box>
            <ProfileButton
              currentImage={currentImage}
              inputKey={inputKey}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />
          </Stack>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack gap={2} sx={{ my: 2 }}>
              <Grid
                spacing={2}
                sm={[4, 4, 4, 12]}
                gridItem={[
                  <Controller
                    name="profession"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Jabatan" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="text"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="user_email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Email" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="text"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="role_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Level Akses" sx={{ pb: 1 }} />
                        <Select autoWidth label="" fullWidth {...field}>
                          <MenuItem value={'1'}>Level 1 - Manajemen</MenuItem>
                          <MenuItem value={'2'}>Level 2 - Operator</MenuItem>
                        </Select>
                      </Box>
                    )}
                  />,
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Password" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="password"
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
                  Success! Data berhasil diubah
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
      <LoadingPopup open={loading} />
    </>
  );
};

export default UserEditDialog;
