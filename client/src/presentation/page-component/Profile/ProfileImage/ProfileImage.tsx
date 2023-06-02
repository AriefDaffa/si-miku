import type { FC } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

interface ProfileImageProps {
  currentImage: any;
}

const ProfileImage: FC<ProfileImageProps> = (props) => {
  const { currentImage } = props;

  return (
    <Stack flexDirection="row">
      <Avatar
        src={
          typeof currentImage === 'string'
            ? currentImage
            : URL.createObjectURL(currentImage)
        }
        alt=""
        sx={{
          width: 200,
          height: 200,
        }}
      />
    </Stack>
  );
};

export default ProfileImage;
