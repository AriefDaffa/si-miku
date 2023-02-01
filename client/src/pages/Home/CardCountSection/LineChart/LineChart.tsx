import { useMemo } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { ERROR, SUCCESS } from '@/theme/Colors';
import { Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import useChartStyle from '@/hooks/use-chart-style';
import CustomChart from '@/components/CustomChart';
import type { YearCountNormalized } from '@/repository/query/IndicatorCountQuery/types';

interface LineChartProps {
  years: YearCountNormalized[];
}

const LineChart: FC<LineChartProps> = (props) => {
  const { years } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.dark],
    fill: { type: 'gradient' },
    markers: {
      size: 5,
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: years.map((item) => {
          return {
            x: item.yearValue,
            y: item.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: years.map((item) => {
          return {
            x: item.yearValue,
            y: item.failed,
          };
        }),
      },
    ];
  }, [years]);

  return (
    <CustomCard>
      <Header text="Grafik perkembangan indikator" variant="h6" />
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Stack alignSelf="center">
        <div>
          <CustomChart
            chartOptions={chartOptions}
            series={series}
            type="area"
            height={400}
          />
        </div>
      </Stack>
    </CustomCard>
  );
};

export default LineChart;
