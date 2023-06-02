import * as yup from 'yup';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Alert from '@mui/material/Alert';

import Card from '@/presentation/global-component/UI/Card';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import AddUserTitle from '@/presentation/page-component/User/AddUser/AddUserTitle/AddUserTitle';
import AddUserForm from '@/presentation/page-component/User/AddUser/AddUserForm/AddUserForm';
import AddUserButton from '@/presentation/page-component/User/AddUser/AddUserButton/AddUserButton';
import useCreateUserMutation from '@/repository/mutation/user/CreateUserMutation';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import type { UserData } from '@/repository/mutation/user/CreateUserMutation';

const AddUserController: FC = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const schema = yup.object().shape({
    profession: yup.string().required('Jabatan tidak boleh kosong!'),
    user_email: yup.string().email().required('Email tidak boleh kosong!'),
    password: yup
      .string()
      .min(8, 'Password kurang dari 8 karakter')
      .required('Password tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { mutate, error, isError } = useCreateUserMutation();

  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      profession: '',
      user_email: '',
      password: '',
      role_id: 1,
    },
    resolver,
  });

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const onSubmit = (data: UserData) => {
    setOpenLoading(true);
    console.log(data);

    mutate(data, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setOpenLoading(false);
          setOpenSuccess(true);

          queryClient.invalidateQueries({
            queryKey: ['user'],
          });
        }
      },
      onError: () => {
        setOpenLoading(false);
      },
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <AddUserTitle />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddUserForm control={control} />
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {String(error || '')}
          </Alert>
        )}
        <AddUserButton />
      </form>
      <LoadingPopup open={openLoading} />
      <DialogPopup
        title="Success!"
        bodyText="User berhasil ditambahkan"
        buttonText=""
        handleClose={handleClose}
        handleAccept={handleClose}
        open={openSuccess}
      />
    </Card>
  );
};

export default AddUserController;
