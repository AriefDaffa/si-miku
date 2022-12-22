import type { FC } from 'react';

import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useCustomTheme } from '@/context/CustomThemeContext';

const DarkModeToggle: FC = () => {
  const { toggleColorMode, isDarkTheme } = useCustomTheme();

  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        padding: 0,
        width: 44,
        height: 44,
      }}
    >
      {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeToggle;
