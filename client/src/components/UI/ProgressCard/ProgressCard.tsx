import type { FC } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@/components/UI/Card';
import { Header, SubHeader } from '@/components/UI/Typography';
import { GREY } from '@/components/theme/Colors';
import { getProgressColor } from '@/utils/get-progress-bar-color';

interface ProgressCardProps {
  value: number;
  headertext: string;
}

const ProgressCard: FC<ProgressCardProps> = (props) => {
  const { value, headertext } = props;

  return (
    <Card>
      <SubHeader text={headertext} />
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <CircularProgress
          variant="determinate"
          value={value}
          size={100}
          sx={{
            color: getProgressColor(value),
            boxShadow: `inset 0 0 1px 8px ${GREY[300]}`,
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Header text={`${value}%`} />
        </Box>
      </Box>
    </Card>
  );
};

export default ProgressCard;
