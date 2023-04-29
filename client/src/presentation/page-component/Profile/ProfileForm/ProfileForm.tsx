import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Grid from '@/components/UI/atoms/Grid';
import { Header } from '@/components/UI/atoms/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface ProfileFormProps {
  isManagement: boolean;
  control: Control<any, any>;
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { control, isManagement } = props;

  return (
    <Fragment>
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
      </Box>
    </Fragment>
  );
};

export default ProfileForm;
