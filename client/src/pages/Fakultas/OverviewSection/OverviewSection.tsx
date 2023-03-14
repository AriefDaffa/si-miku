import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

import useChartStyle from '@/hooks/use-chart-style';
import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import CustomChart from '@/components/UI/atoms/CustomChart';
import { Header } from '@/components/UI/atoms/Typography';
import { ERROR, GREY, PRIMARY, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorByIdDataNormalized } from '@/repository/query/IndicatorByIdQuery';
import type { YearDataNormalized } from '@/repository/query/YearQuery/types';
import CardCount from '@/pages/Home/CardCount';
import type { FakultasDataNormalized } from '@/repository/query/FakultasIndicatorQuery';
import ProgressCard from '@/components/UI/molecules/ProgressCard';
import { getPercentage } from '@/utils/get-percentage';

interface OverviewSectionProps {
  isLoading: boolean;
  data: FakultasDataNormalized;
}

const OverviewSection: FC<OverviewSectionProps> = (props) => {
  const { data, isLoading } = props;

  const percentage = getPercentage(
    data.totalFulfilled,
    data.totalFulfilled + data.totalFailed
  );

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
            title="Data memenuhi target"
            value={data.totalFulfilled}
          />,
          <CardCount
            Icon={CancelIcon}
            backgroundColor={ERROR.main}
            color=""
            title="Data belum memenuhi target"
            value={data.totalFailed}
          />,
          <ProgressCard
            isTitleCenter
            headertext="Progress indikator Fakultas"
            value={percentage}
          />,
        ]}
      />
    </Box>
  );
};

export default OverviewSection;
