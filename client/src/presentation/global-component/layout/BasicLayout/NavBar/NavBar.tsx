import type { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import { LIGHT } from '@/presentation/global-component/theme/Colors';
import icon from '@/assets/logo/icon.png';

interface NavBarProps {}

const NavBar: FC = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: LIGHT.main,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton>
            <Avatar src={icon} alt="photoURL" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
