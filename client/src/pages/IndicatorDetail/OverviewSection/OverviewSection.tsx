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
import ChartCard from './ChartCard';

interface OverviewSectionProps {
  isIndicatorLoading: boolean;
  indicatorData: IndicatorByIdDataNormalized;
}

const OverviewSection: FC<OverviewSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;

  const isFacultyIndicator = indicatorData.isFacultyIndicator === true;

  const fulfilled = isFacultyIndicator
    ? indicatorData.facultyIndicators.count.fulfilled
    : indicatorData.majorIndicators.count.fulfilled;
  const failed = isFacultyIndicator
    ? indicatorData.facultyIndicators.count.failed
    : indicatorData.majorIndicators.count.failed;

  return (
    <Box sx={{ my: 2 }}>
      <Stack>{/* <Header text="Perkembangan Indikator" /> */}</Stack>
      <Grid
        spacing={2}
        sm={[4, 4, 4]}
        gridItem={[
          <CardCount
            Icon={TrackChangesIcon}
            backgroundColor={PRIMARY.main}
            color=""
            title="Total data pada indikator"
            value={fulfilled + failed}
          />,
          <CardCount
            Icon={DoneAllIcon}
            backgroundColor={SUCCESS.main}
            color=""
            title="Data yang memenuhi target"
            value={fulfilled}
          />,
          <CardCount
            Icon={CancelIcon}
            backgroundColor={ERROR.main}
            color=""
            title="Data yang belum memenuhi target"
            value={failed}
          />,
        ]}
      />
    </Box>
  );
};

export default OverviewSection;
