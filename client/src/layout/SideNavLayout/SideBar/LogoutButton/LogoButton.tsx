import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

import { useCustomTheme } from '@/context/CustomThemeContext';
import { useLogoutMutation } from '@/repository/mutation/LogoutMutation';

import { ButtonWrapperCx, navIconCx } from './styles';

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useCustomTheme();
  const { mutate } = useLogoutMutation();

  const logout = () => {
    mutate(undefined, {
      onSuccess: () => navigate('/login'),
    });
  };

  return (
    <div css={ButtonWrapperCx(isDarkTheme)} onClick={logout}>
      <div css={navIconCx}>
        <LogoutIcon />
      </div>
      <div>Logout</div>
    </div>
  );
};

export default LogoutButton;
