import * as yup from 'yup';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Card from '@/presentation/global-component/UI/Card';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import useCreateOperatorMutation from '@/repository/mutation/user/CreateOperatorMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import { UserData } from './types';
import AddUserTitle from '@/presentation/page-component/User/AddUser/AddUserTitle/AddUserTitle';
import AddUserForm from '@/presentation/page-component/User/AddUser/AddUserForm/AddUserForm';
import AddUserButton from '@/presentation/page-component/User/AddUser/AddUserButton/AddUserButton';

const AddUserController: FC = () => {
  const [openLoading, setOpenLoading] = useState(false);

  const schema = yup.object().shape({
    user_name: yup.string().required('User Name tidak boleh kosong!'),
    user_email: yup.string().email().required('Email tidak boleh kosong!'),
    password: yup
      .string()
      .min(8, 'Password kurang dari 8')
      .required('Password tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { mutate } = useCreateOperatorMutation();

  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_name: '',
      user_email: '',
      password: '',
      access_level: 1,
    },
    resolver,
  });

  const onSubmit = (data: UserData) => {
    setOpenLoading(true);
    mutate(data, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setOpenLoading(false);

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
        <AddUserButton />
      </form>
      <LoadingPopup open={openLoading} />
    </Card>
  );
};

export default AddUserController;
