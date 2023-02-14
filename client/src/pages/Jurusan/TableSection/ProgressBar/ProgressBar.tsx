import type { FC } from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { Header } from '@/components/Typography';
import { getProgressColor } from '@/utils/get-progress-bar-color';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { value } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, color: getProgressColor(value) }}>
        <LinearProgress variant="determinate" value={value} color="inherit" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Header variant="subtitle2" text={`${value}%`} />
      </Box>
    </Box>
  );
};

export default ProgressBar;
