import { memo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

import type { FC } from 'react';

import useChartStyle from '@/hooks/use-chart-style';

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
