import type { FC, ReactNode } from 'react';

import { Card, CardContent, Typography, CardHeader } from '@mui/material';

import { cardContainerCx } from './styles';

interface SimpleCardProps {
  title?: string;
  isCenter?: boolean;
  withHeader?: boolean;
  children: ReactNode;
}

const SimpleCard: FC<SimpleCardProps> = (props) => {
  const { title, isCenter = false, withHeader = false, children } = props;
  return (
    <Card css={cardContainerCx(isCenter)}>
      <Typography variant="overline">{title}</Typography>
      {/* {withHeader ? (
        <CardHeader title={title} sx={{ pb: 4 }} />
      ) : (
        <Typography
          color="textSecondary"
          gutterBottom
          variant="overline"
          sx={{ overflowWrap: 'break-word', padding: '16px' }}
        >
          {title}
        </Typography>
      )} */}

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleCard;
