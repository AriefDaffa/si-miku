import { memo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

import type { FC } from 'react';

import { useChart } from '@/utils/useChart';

interface CustomChartProps {
  chartOptions: object;
  series: ApexOptions['series'];
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar';
  width?: number;
}

const CustomChart: FC<CustomChartProps> = (props) => {
  const { chartOptions, series, type, width } = props;

  const options = useChart(chartOptions);

  return <Chart options={options} series={series} type={type} width={width} />;
};

export default memo(CustomChart);