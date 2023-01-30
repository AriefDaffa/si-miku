import type { FC } from 'react';

import { Box, Link, Typography, Avatar, Skeleton } from '@mui/material';
import { useCustomTheme } from '@/context/CustomThemeContext';
import { useAuthContext } from '@/context/AuthContext';
import { useSideBar } from '@/context/SideBarContext';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

import { profileCardCx, profileCardWrapperCx } from './styles';

interface UserProfileCardProps {
  url: string;
  isLoading: boolean;
  data: CurrentUserResponseNormalized;
}

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
  const { url, data } = props;
  const { isMinimized } = useSideBar();
  const { isDarkTheme } = useCustomTheme();

  return (
    <Link underline="none" css={profileCardWrapperCx}>
      <div css={profileCardCx(isDarkTheme)}>
        <Avatar src={url} alt="photoURL" />
        {!isMinimized && (
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {data.userName || <Skeleton variant="text" width={100} />}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {data.email || <Skeleton variant="text" width={100} />}
            </Typography>
          </Box>
        )}
      </div>
    </Link>
  );
};

export default UserProfileCard;
