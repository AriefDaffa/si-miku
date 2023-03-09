import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import useChartStyle from '@/hooks/use-chart-style';
import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import CustomChart from '@/components/UI/atoms/CustomChart';
import { Header } from '@/components/UI/atoms/Typography';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorByIdDataNormalized } from '@/repository/query/IndicatorByIdQuery';
import type { YearDataNormalized } from '@/repository/query/YearQuery/types';

interface ChartCardProps {}

const ChartCard: FC<ChartCardProps> = (props) => {
  const {} = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.dark],
    markers: {
      size: 5,
    },
    labels: ['Data memenuhi target', 'Data belum memenuhi target'],
  });

  const series = [10, 20];

  return (
    <Card sx={{ mb: 2 }}>
      <Stack>{/* <Header text="Perkembangan Indikator" /> */}</Stack>
      <div>
        <CustomChart
          chartOptions={chartOptions}
          series={series}
          type="pie"
          // height={400}
        />
      </div>
    </Card>
  );
};

export default ChartCard;
