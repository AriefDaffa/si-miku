import { useMemo } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';

import { ERROR, SUCCESS } from '@/theme/Colors';
import { Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import useChartStyle from '@/hooks/use-chart-style';
import CustomChart from '@/components/CustomChart';
import type { IndicatorCountNormalized } from '@/repository/query/IndicatorCountQuery/types';

interface LineChartProps {
  fulfilledVal: IndicatorCountNormalized;
  failedVal: IndicatorCountNormalized;
}

const LineChart: FC<LineChartProps> = (props) => {
  const { fulfilledVal, failedVal } = props;

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
        data: fulfilledVal.years.map((item) => {
          return {
            x: item.yearValue,
            y: item.count,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: failedVal.years.map((item) => {
          return {
            x: item.yearValue,
            y: item.count,
          };
        }),
      },
    ];
  }, [fulfilledVal, failedVal]);

  return (
    <CustomCard>
      <Header text="Grafik perkembangan indikator" variant="h6" />
      <Stack alignSelf="center">
        <div>
          <CustomChart
            chartOptions={chartOptions}
            series={series}
            type="area"
          />
        </div>
      </Stack>
    </CustomCard>
  );
};

export default LineChart;
