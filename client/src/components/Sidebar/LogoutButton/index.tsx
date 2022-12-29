import { useCallback } from 'react';
import type { FC } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

import { useCustomTheme } from '@/context/CustomThemeContext';
import { useLogoutMutation } from '@/repository/LogoutMutation';

import { ButtonWrapperCx, navIconCx } from './styles';

const LogoutButton: FC = () => {
  const { isDarkTheme } = useCustomTheme();
  const { mutate } = useLogoutMutation();

  const logout = useCallback(() => {
    mutate();
  }, [mutate]);

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
