import type { FC, ReactNode } from 'react';

import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { cardContainerCx } from './styles';

interface SimpleCardProps {
  title?: string;
  isCenter?: boolean;
  children: ReactNode;
}

const SimpleCard: FC<SimpleCardProps> = (props) => {
  const { title, isCenter = false, children } = props;
  return (
    <Card css={cardContainerCx(isCenter)}>
      {/* <CardHeader title={title} />
      <Divider /> */}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleCard;
