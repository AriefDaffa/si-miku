import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller, Control } from 'react-hook-form';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';

import Grid from '@/components/UI/atoms/Grid';

interface AddUserFormProps {
  control: Control<any, any>;
}

const AddUserForm: FC<AddUserFormProps> = (props) => {
  const { control } = props;

  return (
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
  );
};

export default AddUserForm;
