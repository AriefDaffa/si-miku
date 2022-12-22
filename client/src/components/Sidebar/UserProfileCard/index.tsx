import type { FC } from 'react';

import { Box, Link, Typography, Avatar } from '@mui/material';

import { profileCardCx, profileCardWrapperCx } from './styles';
import { useCustomTheme } from '@/context/CustomThemeContext';

interface UserProfileCardProps {
  url: string;
}

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
  const { url } = props;
  const { isDarkTheme } = useCustomTheme();
  const user_name = 'John';
  const user_email = '123';
  // const { user_email, user_name } = useUserContext();

  return (
    <Link underline="none" css={profileCardWrapperCx}>
      <div css={profileCardCx(isDarkTheme)}>
        <Avatar src={url} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {user_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {user_email}
          </Typography>
        </Box>
      </div>
    </Link>
  );
};

export default UserProfileCard;
