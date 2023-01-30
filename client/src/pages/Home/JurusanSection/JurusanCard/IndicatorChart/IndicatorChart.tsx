import type { FC } from 'react';

import Stack from '@mui/material/Stack';

import { SubHeader, Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import CustomChart from '@/components/CustomChart';

interface IndicatorChartProps {}

const IndicatorChart: FC<IndicatorChartProps> = (props) => {
  const {} = props;

  return (
    <CustomCard>
      <Header text="Perkembangan" variant="h6" />
      <Stack alignSelf="center">
        <div>
          {/* <CustomChart
            chartOptions={chartOptions}
            series={series}
            type="area"
          /> */}
        </div>
      </Stack>
    </CustomCard>
  );
};

export default IndicatorChart;
