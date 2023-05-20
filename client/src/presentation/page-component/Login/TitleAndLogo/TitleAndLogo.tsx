import type { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TitleAndLogoProps {
  logo: string;
}

const TitleAndLogo: FC<TitleAndLogoProps> = (props) => {
  const { logo } = props;

  return (
    <Box sx={{ my: 2 }}>
      <img src={logo} alt="" />
      <Typography color="textPrimary" variant="h4" sx={{ pt: 4 }}>
        Sign in
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Sign in to access the dashboard
      </Typography>
    </Box>
  );
};

export default TitleAndLogo;
