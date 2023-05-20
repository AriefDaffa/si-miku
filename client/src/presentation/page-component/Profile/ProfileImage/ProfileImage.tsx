import type { FC } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

interface ProfileImageProps {
  currentImage: any;
}

const ProfileImage: FC<ProfileImageProps> = (props) => {
  const { currentImage } = props;

  return (
    <Box>
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
    </Box>
  );
};

export default ProfileImage;
