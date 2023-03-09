import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

import { useCustomTheme } from '@/context/CustomThemeContext';
import { useLogoutMutation } from '@/repository/mutation/LogoutMutation';
import { useSideBar } from '@/context/SideBarContext';

import { ButtonWrapperCx, navIconCx } from './styles';
import DialogPopup from '@/components/UI/atoms/DialogPopup';

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { isDarkTheme } = useCustomTheme();
  const { mutate } = useLogoutMutation();
  const { isMinimized } = useSideBar();

  const logout = () => {
    setOpenDialog(false);
    mutate(undefined, {
      onSuccess: () => navigate('/login'),
    });
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div css={ButtonWrapperCx(isDarkTheme)} onClick={handleOpen}>
        <div css={navIconCx}>
          <LogoutIcon />
        </div>
        {!isMinimized && <div>Logout</div>}
      </div>
      <DialogPopup
        title="Logout"
        bodyText="Apakah anda yakin ingin keluar?"
        buttonText="Keluar"
        handleClose={handleClose}
        handleAccept={logout}
        open={openDialog}
      />
    </>
  );
};

export default LogoutButton;
