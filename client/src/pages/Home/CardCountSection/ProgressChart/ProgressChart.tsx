import { useMemo } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { Header, SubHeader } from '@/components/Typography';
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
    legend: {
      show: false,
    },
    colors: [SUCCESS.dark, ERROR.dark],
    labels: ['Indikator memenuhi Target', 'Indikator belum memenuhi Target'],
  });

  const getPercentage = useMemo(() => {
    const total = fulfilledVal + failedVal;

    const resultFailed = (failedVal / total) * 100;
    const resultFulfilled = (fulfilledVal / total) * 100;

    return {
      resultFailed: resultFailed || 0,
      resultFulfilled: resultFulfilled || 0,
    };
  }, [failedVal, fulfilledVal]);

  return (
    <CustomCard>
      <Header text="Progress indikator" variant="h6" sx={{ pb: 1 }} />
      <Stack flexDirection="row" direction={{ xs: 'column', sm: 'row' }}>
        <div>
          <CustomChart
            chartOptions={chartOptions}
            series={[fulfilledVal, failedVal]}
            type="donut"
          />
        </div>
        <Stack justifyContent="center">
          <Box>
            <Header text={`${getPercentage.resultFulfilled}%`} />
            <SubHeader text="Indikator memenuhi target" />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Header text={`${getPercentage.resultFailed}%`} />
            <SubHeader text="Indikator belum memenuhi target" />
          </Box>
        </Stack>
      </Stack>
    </CustomCard>
  );
};

export default ProgressChart;
