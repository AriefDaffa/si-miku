import { useMemo } from 'react';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Grid from '@/components/UI/atoms/Grid';

import Card from '@/components/UI/atoms/Card';
import CustomChart from '@/components/UI/atoms/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';
import { ERROR, SUCCESS } from '@/components/theme/Colors';
import { Header } from '@/components/UI/atoms/Typography';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery/types';

interface ChartSectionProps {
  majorData: IndicatorByMajorNormalized;
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { majorData } = props;

  const chartOptions = useChartStyle({
    // chart: {
    //   stacked: true,
    //   stackType: '100%',
    // },
    // plotOptions: {
    //   bar: { horizontal: true, barHeight: '50%', borderRadius: 2 },
    // },
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    colors: [SUCCESS.dark, ERROR.dark],
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: majorData.indicatorMajors.map((item) => {
          return {
            x: item.indicatorName,
            y: item.total.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: majorData.indicatorMajors.map((item) => {
          return {
            x: item.indicatorName,
            y: item.total.failed,
          };
        }),
      },
    ];
  }, [majorData]);

  return (
    <Grid
      sx={{ pt: 2 }}
      gridItem={[
        <Card>
          <Header text="Progress Jurusan" variant="h6" sx={{ pb: 1 }} />
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Box>
            <CustomChart
              chartOptions={chartOptions}
              series={series}
              type="bar"
              height={500}
            />
          </Box>
        </Card>,
      ]}
    />
  );
};

export default ChartSection;
