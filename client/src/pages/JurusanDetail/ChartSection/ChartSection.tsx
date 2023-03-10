import { useMemo } from 'react';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import CustomChart from '@/components/UI/atoms/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';
import { Header } from '@/components/UI/atoms/Typography';
import { ERROR, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery';

interface ChartSectionProps {
  isLoading: boolean;
  majorData: IndicatorByMajorNormalized;
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { majorData, isLoading } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.dark],
    markers: {
      size: 5,
    },
    chart: {
      animations: {
        enabled: false,
      },
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: majorData.indicatorList.map((item) => {
          return {
            x: item.indicatorName,
            y: item.count.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: majorData.indicatorList.map((item) => {
          return {
            x: item.indicatorName,
            y: item.count.failed,
          };
        }),
      },
    ];
  }, [majorData]);

  return (
    <Grid
      gridItem={[
        <Card>
          <Header text="Progress Jurusan" variant="h6" sx={{ pb: 1 }} />
          <Divider sx={{ mt: 2, mb: 3 }} />
          {isLoading ? (
            <Skeleton height={400} />
          ) : (
            <div>
              <CustomChart
                chartOptions={chartOptions}
                series={series}
                type="bar"
                height={400}
              />
            </div>
          )}
        </Card>,
      ]}
    />
  );
};

export default ChartSection;
