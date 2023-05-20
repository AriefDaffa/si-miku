import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle';

interface ProfileContainerProps {
  children: ReactNode;
}

// {/* <PageTitle title="Profile" subTitle="Menampilkan profile pengguna" /> */}
const ProfileContainer: FC<ProfileContainerProps> = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <AvatarTitle
        isImageIcon
        Icon={AccountBoxIcon}
        imageURL=""
        header="Profile pengguna"
        subHeader="Edit"
      />
      <Stack justifyContent="center" flexDirection="column" alignItems="center">
        {children}
      </Stack>
    </Fragment>
  );
};

export default ProfileContainer;
