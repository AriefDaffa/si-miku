import { Link as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import { Box, Link } from '@mui/material';
import { useSideBar } from '@/context/SideBarContext';
import logo from '@/assets/logo/logo.png';
import icon from '@/assets/logo/icon.png';

const LogoSection: FC = () => {
  const { isMinimized } = useSideBar();

  return (
    <Box sx={{ p: 1, display: 'inline-flex' }}>
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        <img
          src={isMinimized ? icon : logo}
          alt=""
          style={{
            width: '100%',
            height: '80px',
            objectFit: 'contain',
          }}
        />
      </Link>
    </Box>
  );
};

export default LogoSection;
