import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useUserQuery from '@/repository/query/UserQuery/useUserQuery';
import useCreateOperatorMutation from '@/repository/mutation/CreateOperatorMutation';
import { Header } from '@/components/UI/atoms/Typography';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import { UserData } from './types';

const AddUserSection: FC = () => {
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
  const { refetch } = useUserQuery(2, true);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_name: '',
      user_email: '',
      password: '',
    },
    resolver,
  });

  const onSubmit = (data: UserData) => {
    setOpenLoading(true);
    mutate(data, {
      onSuccess: () => {
        setOpenLoading(false);
        refetch();
      },
      onError: () => {
        setOpenLoading(false);
      },
    });
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Tambah Operator" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          sm={[4, 4, 4]}
          gridItem={[
            <Controller
              name="user_name"
              control={control}
              rules={{ required: true }}
              defaultValue={''}
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
              defaultValue={''}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  type="email"
                  error={fieldState.error ? true : false}
                  label={'User Email'}
                  helperText={fieldState.error?.message}
                  //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                  {...field}
                />
              )}
            />,
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  type="password"
                  error={fieldState.error ? true : false}
                  label={'Password'}
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
      <LoadingPopup open={openLoading} />
    </Card>
  );
};

export default AddUserSection;
