import type { FC } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import CustomCard from '@/components/CustomCard';
import { Header, SubHeader } from '@/components/Typography';
import { ERROR, GREY, SUCCESS, WARNING } from '@/theme/Colors';

interface ProgressCardProps {
  value: number;
}

const ProgressCard: FC<ProgressCardProps> = (props) => {
  const { value } = props;

  const colorChange = () => {
    if (value >= 70) {
      return SUCCESS.dark;
    } else if (value >= 40 && value < 70) {
      return WARNING.light;
    } else {
      return ERROR.dark;
    }
  };

  return (
    <CustomCard>
      <SubHeader text="Progress indikator" />
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
            color: colorChange(),
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
    </CustomCard>
  );
};

export default ProgressCard;
