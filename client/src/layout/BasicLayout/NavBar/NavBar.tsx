import type { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { LIGHT } from '@/theme/Colors';

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
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <ProfileIcon /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
