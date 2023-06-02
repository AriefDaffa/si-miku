import type { FC } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const IndicatorInputSkeleton: FC = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default IndicatorInputSkeleton;
