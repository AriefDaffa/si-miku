import { useMemo } from 'react';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';

import { SubHeader, Header } from '@/components/Typography';
import { ERROR, SUCCESS } from '@/theme/Colors';
import CustomCard from '@/components/CustomCard';
import CustomChart from '@/components/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';

interface JurusanCardProps {
  majorData: MajorOverviewNormalized[];
}

const JurusanCard: FC<JurusanCardProps> = (props) => {
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
    colors: [SUCCESS.dark, ERROR.dark],
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: majorData.map((item) => {
          return {
            x: item.majorName,
            y: item.totalFulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: majorData.map((item) => {
          return {
            x: item.majorName,
            y: item.totalFailed,
          };
        }),
      },
    ];
  }, [majorData]);

  return (
    <CustomCard>
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
    </CustomCard>
  );
};

export default JurusanCard;
