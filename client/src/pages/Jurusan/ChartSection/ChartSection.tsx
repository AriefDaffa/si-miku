import { useMemo } from 'react';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';

import Grid from '@/components/UI/Grid';

import Card from '@/components/UI/Card';
import { Header } from '@/components/UI/Typography';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';
import CustomChart from '@/components/UI/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';

interface ChartSectionProps {
  majorData: MajorOverviewNormalized[];
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { majorData } = props;

  const chartOptions = useChartStyle({
    // chart: {
    //   stacked: true,
    //   stackType: '100%',
    // },
    plotOptions: {
      bar: { horizontal: true, barHeight: '50%', borderRadius: 2 },
    },
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    // colors: [SUCCESS.dark, ERROR.dark],
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: majorData.map((item) => {
          return {
            x: item.majorName,
            y: item.total.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: majorData.map((item) => {
          return {
            x: item.majorName,
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
          <div>
            <CustomChart
              chartOptions={chartOptions}
              series={series}
              type="bar"
              height={400}
            />
          </div>
        </Card>,
      ]}
    />
  );
};

export default ChartSection;
