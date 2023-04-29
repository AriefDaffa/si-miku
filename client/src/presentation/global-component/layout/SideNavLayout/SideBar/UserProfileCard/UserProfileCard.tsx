import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { Box, Link, Typography, Avatar, Skeleton } from '@mui/material';
import { useCustomTheme } from '@/controller/context/CustomThemeContext';
import { useSideBar } from '@/controller/context/SideBarContext';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

import { profileCardCx, profileCardWrapperCx } from './styles';

interface UserProfileCardProps {
  isLoading: boolean;
  data: CurrentUserResponseNormalized;
}

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
  const { data } = props;
  const { isMinimized } = useSideBar();
  const { isDarkTheme } = useCustomTheme();

  const navigate = useNavigate();

  return (
    <Link underline="none" css={profileCardWrapperCx}>
      <div
        css={profileCardCx(isDarkTheme)}
        onClick={() => navigate('/dashboard/profile')}
      >
        <Avatar
          src={data.userImage}
          alt="photoURL"
          sx={{ border: '1px solid #fff' }}
        />
        {!isMinimized && (
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'white' }}>
              {data.userName || <Skeleton variant="text" width={100} />}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {data.email || <Skeleton variant="text" width={100} />}
            </Typography>
          </Box>
        )}
      </div>
    </Link>
  );
};

export default UserProfileCard;
