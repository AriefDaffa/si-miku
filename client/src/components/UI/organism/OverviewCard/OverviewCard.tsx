import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import Grid from '@/components/UI/atoms/Grid';
import CardCount from '@/pages/Home/CardCount';
import ProgressCard from '@/components/UI/molecules/ProgressCard';
import { getPercentage } from '@/utils/get-percentage';
import { ERROR, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery';

interface OverviewCardProps {
  isLoading: boolean;
  fulfilled: number;
  failed: number;
}

const OverviewCard: FC<OverviewCardProps> = (props) => {
  const { fulfilled, failed, isLoading } = props;

  const percentage = getPercentage(fulfilled, fulfilled + failed);

  return (
    <Box sx={{ my: 2 }}>
      <Stack>{/* <Header text="Perkembangan Indikator" /> */}</Stack>
      <Grid
        spacing={2}
        sm={[4, 4, 4]}
        gridItem={[
          // <CardCount
          //   Icon={TrackChangesIcon}
          //   backgroundColor={PRIMARY.main}
          //   color=""
          //   title="Total indikator"
          //   value={data.totalData}
          // />,
          <CardCount
            Icon={DoneAllIcon}
            backgroundColor={SUCCESS.main}
            color=""
            title="Indikator memenuhi target"
            value={fulfilled}
          />,
          <CardCount
            Icon={CancelIcon}
            backgroundColor={ERROR.main}
            color=""
            title="Indikator belum memenuhi target"
            value={failed}
          />,
          <ProgressCard
            isTitleCenter
            headertext="Progress indikator"
            value={percentage}
          />,
        ]}
      />
    </Box>
  );
};

export default OverviewCard;
