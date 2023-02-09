import type { FC, ReactNode } from 'react';

import CardContent from '@mui/material/CardContent';
import { Card as MuiCard } from '@mui/material';
import type { SxProps } from '@mui/material';

import { cardContainerCx } from './styles';

interface CustomCardProps {
  isCenter?: boolean;
  sx?: SxProps;
  children: ReactNode;
}

const CustomCard: FC<CustomCardProps> = (props) => {
  const { isCenter = false, children, sx } = props;
  return (
    <MuiCard css={cardContainerCx(isCenter)} sx={sx}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default CustomCard;
