import type { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { useCustomTheme } from '@/controller/context/CustomThemeContext';
import { useSideBar } from '@/controller/context/SideBarContext';
import { DARK } from '@/presentation/global-component/theme/Colors';

import ProfileIcon from './ProfileIcon';

interface NavBarProps {
  onOpenNav: () => void;
}

const NavBar: FC<NavBarProps> = (props) => {
  const { onOpenNav } = props;
  const { isMinimized, setIsMinimized } = useSideBar();
  const { isDarkTheme } = useCustomTheme();

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

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
        <IconButton
          onClick={handleMinimize}
          sx={{
            mr: 1,
            ml: isMinimized ? '70px' : '270px',
            color: 'text.primary',
            transition: 'all 0.5s',
            display: { xs: 'none', lg: 'block' },
          }}
        >
          {isMinimized ? <MenuIcon /> : <MenuOpenIcon />}
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
          {/* <ProfileIcon /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
