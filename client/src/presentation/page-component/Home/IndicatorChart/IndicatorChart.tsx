import { useMemo, Fragment } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { SelectChangeEvent } from '@mui/material/Select';

import CustomChart from '@/presentation/global-component/UI/CustomChart';
import useChartStyle from '@/controller/hooks/use-chart-style';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import { YearProgressNormalized } from '@/repository/query/indicator/IndicatorOverview';

import IndicatorChartToolbar from './IndicatorChartToolbar';

interface IndicatorChartProps {
  indicatorTotal: number;
  yearRange: number;
  sort: boolean;
  data: YearProgressNormalized[];
  onYearRangeChange: (e: SelectChangeEvent) => void;
  onSortChange: (e: SelectChangeEvent) => void;
}

const IndicatorChart: FC<IndicatorChartProps> = (props) => {
  const {
    indicatorTotal,
    onSortChange,
    sort,
    data,
    yearRange,
    onYearRangeChange,
  } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
    colors: [SUCCESS.dark, ERROR.main, GREY[600]],
    chart: {
      // stacked: true,
      // stackType: '100%',
      animations: {
        enabled: false,
      },
    },
    // plotOptions: {
    //   bar: {
    //     horizontal: true,
    //   },
    // },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Data indikator memenuhi target',
        data: data.map((item) => {
          return {
            x: item.yearValue,
            y: item.count.fulfilled,
          };
        }),
      },
      {
        name: 'Data indikator belum memenuhi target',
        data: data.map((item) => {
          return {
            x: item.yearValue,
            y: item.count.failed,
          };
        }),
      },
      // {
      //   name: 'Data indikator belum ditambahkan',
      //   data: data.map((item) => {
      //     return {
      //       x: item.yearValue,
      //       y: indicatorTotal - (item.count.failed + item.count.fulfilled),
      //     };
      //   }),
      // },
    ];
  }, [data]);

  return (
    <Fragment>
      <AvatarTitle
        isImageIcon
        header="Perkembangan Indikator 5 tahun terakhir"
        imageURL=""
        subHeader="Grafik"
        Icon={TrendingUpIcon}
      />
      {/* <IndicatorChartToolbar
        sort={sort}
        yearRange={yearRange}
        onYearRangeChange={onYearRangeChange}
        onSortChange={onSortChange}
      /> */}
      <Card sx={{ p: 1, mt: 1 }}>
        <Box>
          <CustomChart
            chartOptions={chartOptions}
            series={series}
            type="area"
            height={400}
          />
        </Box>
      </Card>
    </Fragment>
  );
};

export default IndicatorChart;
