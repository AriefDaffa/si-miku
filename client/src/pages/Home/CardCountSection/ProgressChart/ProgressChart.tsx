import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { Header } from '@/components/Typography';
import { ERROR, SUCCESS } from '@/theme/Colors';
import CustomCard from '@/components/CustomCard';
import CustomChart from '@/components/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';

interface ProgressChartProps {
  fulfilledVal: number;
  failedVal: number;
}

const ProgressChart: FC<ProgressChartProps> = (props) => {
  const { fulfilledVal, failedVal } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    pie: {
      donut: {
        labels: {
          show: false,
          total: { show: false },
        },
      },
    },
    colors: [SUCCESS.dark, ERROR.dark],
    labels: ['Indikator memenuhi Target', 'Indikator belum memenuhi Target'],
  });

  return (
    <CustomCard>
      <Header text="Progress indikator" variant="h6" sx={{ pb: 1 }} />
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Stack flexDirection="column" justifyContent="center">
        <div>
          <CustomChart
            chartOptions={chartOptions}
            series={[fulfilledVal, failedVal]}
            type="pie"
            height={400}
          />
        </div>
      </Stack>
    </CustomCard>
  );
};

export default ProgressChart;
