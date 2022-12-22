import { Link as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import { Box, Link } from '@mui/material';

import { useCustomTheme } from '@/context/CustomThemeContext';
import logoLight from '@/assets/logo/logo-light.png';
import logoDark from '@/assets/logo/logo-dark.png';

const LogoSection: FC = () => {
  const { isDarkTheme } = useCustomTheme();

  return (
    <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        <img
          src={isDarkTheme ? logoDark : logoLight}
          alt=""
          style={{
            width: '100%',
            height: '40px',
            objectFit: 'contain',
          }}
        />
      </Link>
    </Box>
  );
};

export default LogoSection;
