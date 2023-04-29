import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material';

interface HeaderProps {
  text: string;
  variant?:
    | 'h5'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit';
  sx?: SxProps;
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
