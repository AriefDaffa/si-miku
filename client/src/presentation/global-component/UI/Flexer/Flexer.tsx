import type { FC, ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material';

interface FlexerProps {
  direction?: 'row' | 'column';
  justifyContent?: string;
  sx?: SxProps;
  children: ReactNode;
}

const Flexer: FC<FlexerProps> = (props) => {
  const { children, direction = 'row', sx = {} } = props;

  const isRow = direction === 'row';

  return (
    <Stack
      direction={{ sm: direction }}
      alignItems={isRow ? 'center' : ''}
      justifyContent="space-between"
      sx={sx}
    >
      {children}
    </Stack>
  );
};

export default Flexer;
