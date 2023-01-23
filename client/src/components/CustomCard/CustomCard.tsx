import type { FC, ReactNode } from 'react';

import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';

import { cardContainerCx } from './styles';

interface CustomCardProps {
  isCenter?: boolean;
  sx?: object;
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
