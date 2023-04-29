import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material';

import { useCustomTheme } from '@/controller/context/CustomThemeContext';
import { useLogoutMutation } from '@/repository/mutation/auth/LogoutMutation';
import { useSideBar } from '@/controller/context/SideBarContext';

import { ButtonWrapperCx, navIconCx } from './styles';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import { ERROR, PRIMARY } from '@/presentation/global-component/theme/Colors';

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
      <ListItemButton
        disableGutters
        // component={RouterLink}
        // to={path}
        onClick={handleOpen}
        sx={{
          ...theme.typography.body2,
          height: 48,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          textTransform: 'capitalize',
          color: ERROR.main,
          // backgroundColor: ERROR.main,
          borderRadius: 1,
          fontWeight: 'fontWeightBold',
          border: `2px solid ${ERROR.main}`,

          ':hover': {
            backgroundColor: ERROR.main,
            color: 'white',
          },
        }}
      >
        <ListItemIcon css={navIconCx}>
          <LogoutIcon />
        </ListItemIcon>
        {!isMinimized && <ListItemText disableTypography primary={'Logout'} />}
      </ListItemButton>
      {/* <div css={ButtonWrapperCx(isDarkTheme)} onClick={handleOpen}>
        <div css={navIconCx}>
          <LogoutIcon />
        </div>
        {!isMinimized && <div>Logout</div>}
      </div> */}
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
