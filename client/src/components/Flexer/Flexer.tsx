import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';

interface FlexerProps {
  children: ReactNode;
  flexDirection?: string;
  width?: string;
  alignItems?: string;
}

const Flexer: FC<FlexerProps> = (props) => {
  const {
    children,
    flexDirection = 'column',
    width = '100%',
    alignItems = 'none',
  } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection, width, alignItems }}>
      {children}
    </Box>
  );
};

export default Flexer;
