import type { FC } from 'react';

import { Box, Link, Typography, Avatar, Skeleton } from '@mui/material';
import { useCustomTheme } from '@/context/CustomThemeContext';

import { profileCardCx, profileCardWrapperCx } from './styles';

interface UserProfileCardProps {
  url: string;
}

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
  const { url } = props;
  const { isDarkTheme } = useCustomTheme();

  return (
    <Link underline="none" css={profileCardWrapperCx}>
      <div css={profileCardCx(isDarkTheme)}>
        <Avatar src={url} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {/* {data?.data.username || <Skeleton variant="text" width={100} />} */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {/* {data?.data.email || <Skeleton variant="text" width={100} />} */}
          </Typography>
        </Box>
      </div>
    </Link>
  );
};

export default UserProfileCard;
