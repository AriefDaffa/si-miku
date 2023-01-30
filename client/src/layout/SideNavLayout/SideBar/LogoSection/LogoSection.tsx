import { Link as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import { Box, Link } from '@mui/material';
import logo from '@/assets/logo/logo.png';

const LogoSection: FC = () => {
  return (
    <Box sx={{ p: 2, display: 'inline-flex' }}>
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        <img
          src={logo}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Link>
    </Box>
  );
};

export default LogoSection;
