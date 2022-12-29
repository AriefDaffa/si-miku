import type { FC } from 'react';

import { AppBar, Toolbar } from '@mui/material';
import { Box, Stack, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useCustomTheme } from '@/context/CustomThemeContext';
import { DARK } from '@/theme/Colors';

import DarkModeToggle from './DarkModeToggle';
// import ProfileIcon from './ProfileIcon';

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: FC<HeaderProps> = ({ onOpenNav }) => {
  const { isDarkTheme } = useCustomTheme();

  return (
    <AppBar
      sx={{
        backgroundColor: isDarkTheme ? DARK.main : '#fff',
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
          {/* <ProfileIcon /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
