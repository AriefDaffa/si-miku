import type { FC } from 'react';

import { AppBar, Toolbar } from '@mui/material';
import { Box, Stack, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import DarkModeToggle from './DarkModeToggle';
import ProfileIcon from './ProfileIcon';
import { toolbarCx } from './styles';

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: FC<HeaderProps> = ({ onOpenNav }) => {
  return (
    <AppBar
      sx={{
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <DarkModeToggle />
          <ProfileIcon />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
