import Chart from 'react-apexcharts';
import { memo } from 'react';
import type { ApexOptions } from 'apexcharts';

import type { FC } from 'react';

import useChartStyle from '@/controller/hooks/use-chart-style';

import type { ChartTypes } from './types';

interface CustomChartProps {
  chartOptions: object;
  series: ApexOptions['series'];
  type: ChartTypes;
  width?: number;
  height?: number;
}

const CustomChart: FC<CustomChartProps> = (props) => {
  const { chartOptions, series, type, width, height } = props;

  const options = useChartStyle(chartOptions);

  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
};

export default memo(CustomChart);
