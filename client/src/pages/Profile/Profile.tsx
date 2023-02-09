import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Helmet from '@/components/Helmet';
import CustomCard from '@/components/CustomCard';

import { Header, PageTitle, SubHeader } from '@/components/Typography';
import { TextInput } from '@/components/Input';
import { useAuthContext } from '@/context/AuthContext';

const Profile: FC = () => {
  const { user, isLoading } = useAuthContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      userEmail: '',
      userImage: '',
    },
  });

  return (
    <>
      <Helmet title="Profile | SI-MIKU" />
      <Container>
        <PageTitle title="Profile" subTitle="Menampilkan profile pengguna" />
        <CustomCard>
          <Header text="Edit profile" />
          <SubHeader
            text="Ubah informasi di bawah untuk mengubah profile"
            sx={{ mb: 4 }}
          />
          <Stack
            direction={{ sm: 'row' }}
            justifyContent="space-around"
            sx={{ px: 2 }}
          >
            <Box>
              <Avatar
                src={user.userImage}
                alt=""
                sx={{
                  width: 300,
                  height: 300,
                }}
              />
            </Box>
            <Box>
              <Divider orientation="vertical" sx={{ mx: 4 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextInput
                control={control}
                defaultValue={user.userName}
                label="Username"
                name="username"
                type="text"
              />
            </Box>
          </Stack>
        </CustomCard>
      </Container>
    </>
  );
};

export default Profile;
