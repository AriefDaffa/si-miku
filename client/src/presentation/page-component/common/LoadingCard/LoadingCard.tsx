import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import Card from '@/components/UI/atoms/Card';

interface LoadingCardProps {}

const LoadingCard: FC<LoadingCardProps> = (props) => {
  //   const { message, title = '' } = props;
  return (
    <Card>
      <Skeleton height={50} width={200} />
      <Box>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </Box>
    </Card>
  );
};

export default LoadingCard;
