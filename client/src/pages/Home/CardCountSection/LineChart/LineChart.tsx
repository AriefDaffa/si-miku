import { useMemo, useState } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ERROR, SUCCESS } from '@/theme/Colors';
import { Header, SubHeader } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import useChartStyle from '@/hooks/use-chart-style';
import CustomChart from '@/components/CustomChart';
import type { YearCountNormalized } from '@/repository/query/IndicatorCountQuery/types';
import type { ChartTypes } from '@/components/CustomChart/types';
import { chartTypeConstant } from '@/components/CustomChart/constant';

interface LineChartProps {
  years: YearCountNormalized[];
}

const LineChart: FC<LineChartProps> = (props) => {
  const { years } = props;

  const [barType, setBarType] = useState<ChartTypes>('area');

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
        data: years
          .sort((a, b) => a.yearValue - b.yearValue)
          .map((item) => {
            return {
              x: item.yearValue,
              y: item.target.fulfilled,
            };
          }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: years
          .sort((a, b) => a.yearValue - b.yearValue)
          .map((item) => {
            return {
              x: item.yearValue,
              y: item.target.failed,
            };
          }),
      },
    ];
  }, [years]);

  return (
    <CustomCard>
      <SubHeader text="Grafik perkembangan indikator" />
      {/* <Divider sx={{ mt: 2, mb: 3 }} /> */}
      <FormControl>
        <Select value={barType} defaultValue="bar">
          {chartTypeConstant.map((item, idx) => (
            <MenuItem key={idx}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack alignSelf="center" sx={{ mt: 2 }}>
        <div>
          <CustomChart
            chartOptions={chartOptions}
            series={series}
            type={'area'}
            height={400}
          />
        </div>
      </Stack>
    </CustomCard>
  );
};

export default LineChart;
