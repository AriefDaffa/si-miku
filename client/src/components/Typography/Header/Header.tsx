import type { FC } from 'react';

import Typography from '@mui/material/Typography';

interface HeaderProps {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  sx?: object;
}

const Header: FC<HeaderProps> = (props) => {
  const { text, variant = 'h5', sx } = props;

  return (
    <Typography variant={variant} sx={sx}>
      {text}
    </Typography>
  );
};

export default Header;
