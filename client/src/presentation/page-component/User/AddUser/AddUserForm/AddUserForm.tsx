import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller, Control } from 'react-hook-form';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Grid from '@/presentation/global-component/UI/Grid';
import { SubHeader } from '@/presentation/global-component/UI/Typography';

interface AddUserFormProps {
  control: Control<any, any>;
}

const AddUserForm: FC<AddUserFormProps> = (props) => {
  const { control } = props;

  return (
    <Grid
      spacing={1}
      sm={[4, 4, 4]}
      gridItem={[
        <Controller
          name="profession"
          control={control}
          rules={{ required: true }}
          defaultValue={''}
          render={({ field, fieldState }) => (
            <Box>
              <SubHeader text="Username" sx={{ pb: 1 }} />
              <TextField
                fullWidth
                type="text"
                error={fieldState.error ? true : false}
                // label={'Jabatan'}
                helperText={fieldState.error?.message}
                //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                {...field}
              />
            </Box>
          )}
        />,
        <Controller
          name="user_email"
          control={control}
          rules={{ required: true }}
          defaultValue={''}
          render={({ field, fieldState }) => (
            <Box>
              <SubHeader text="Email" sx={{ pb: 1 }} />
              <TextField
                fullWidth
                type="email"
                error={fieldState.error ? true : false}
                // label={'User Email'}
                helperText={fieldState.error?.message}
                //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                {...field}
              />
            </Box>
          )}
        />,
        // <Controller
        //   name="role_id" // jadiin level akses
        //   control={control}
        //   rules={{ required: true }}
        //   render={({ field, fieldState }) => (
        //     <Box>
        //       <SubHeader text="Level Akses" sx={{ pb: 1 }} />
        //       <Select autoWidth label="" fullWidth {...field}>
        //         <MenuItem value={'1'}>Level 1 - Manajemen</MenuItem>
        //         <MenuItem value={'2'}>Level 2 - Operator</MenuItem>
        //       </Select>
        //     </Box>
        //   )}
        // />,
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          defaultValue={''}
          render={({ field, fieldState }) => (
            <Box>
              <SubHeader text="Password" sx={{ pb: 1 }} />
              <TextField
                fullWidth
                type="password"
                error={fieldState.error ? true : false}
                // label={'Password'}
                helperText={fieldState.error?.message}
                //   helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
                {...field}
              />
            </Box>
          )}
        />,
      ]}
    />
  );
};

export default AddUserForm;
