import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import Grid from '@/presentation/global-component/UI/Grid';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { CurrentUserResponseNormalized } from '@/repository/query/user/CurrentUserQuery';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader/TextWithSubHeader';

interface ProfileFormProps {
  errorMessage: string;
  data: CurrentUserResponseNormalized;
  control: Control<any, any>;
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { control, data, errorMessage } = props;

  return (
    <Fragment>
      {/* <Box>
        <Header
          text={`Role: ${data.role}`}
          sx={{ textAlign: 'center', my: 2 }}
        />
      </Box> */}

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Divider sx={{ my: 2 }} />
        <Stack flexDirection="row" gap={1}>
          <Box sx={{ width: '100%' }}>
            <TextWithSubHeader header={`${data.email}`} subHeader="Email" />
          </Box>
          <Box>
            <Divider orientation="vertical" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextWithSubHeader header={`${data.role}`} subHeader="Role" />
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack>
          <Header text="Ubah Password" sx={{ textAlign: 'center' }} />
        </Stack>
        <Grid
          spacing={1}
          gridItem={[
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Box>
                  <SubHeader text="Password" />
                  <TextField
                    fullWidth
                    type="password"
                    error={fieldState.error ? true : false}
                    // label={'Password'}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                </Box>
              )}
            />,
            <Controller
              name="confirm_password"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Box>
                  <SubHeader text="Confirm Password" />
                  <TextField
                    fullWidth
                    type="password"
                    error={fieldState.error ? true : false}
                    // label={'Re-type Password'}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                </Box>
              )}
            />,
          ]}
        />
        {errorMessage !== '' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
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
