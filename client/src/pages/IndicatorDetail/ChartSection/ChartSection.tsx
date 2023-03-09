import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import useChartStyle from '@/hooks/use-chart-style';
import Card from '@/components/UI/atoms/Card';
import CustomChart from '@/components/UI/atoms/CustomChart';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { ERROR, SUCCESS } from '@/components/theme/Colors';
import type { TargetQuartersNormalized } from '@/repository/query/IndicatorByIdQuery';

interface ChartSectionProps {
  isIndicatorLoading: boolean;
  indicatorData: TargetQuartersNormalized[];
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    // colors: [SUCCESS.dark, ERROR.dark],
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
        name: 'Indikator',
        data: indicatorData
          .sort((a, b) => a.yearValue - b.yearValue)
          .map((item) => {
            const total = item.q1 + item.q2 + item.q3 + item.q4;
            const isFulfilled = total >= item.targetValue;

            return {
              x: item.yearValue,
              y: total,
              fillColor: isFulfilled ? SUCCESS.dark : ERROR.dark,
              strokeColor: isFulfilled ? SUCCESS.dark : ERROR.dark,
              goals: [
                {
                  name: 'Target indikator',
                  value: item.targetValue,
                  strokeColor: '#000',
                  strokeHeight: 5,
                },
              ],
            };
          }),
      },
    ];
  }, [indicatorData]);

  return (
    <Card sx={{ mb: 1 }}>
      <Stack sx={{ mb: 1 }}>
        <Header text="Grafik perkembangan Indikator" />
      </Stack>
      <Box>
        {isIndicatorLoading ? (
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
      </Box>
      <Box sx={{ opacity: 0.5, mt: 1, fontStyle: 'italic' }}>
        <SubHeader text="Keterangan:" />
        <SubHeader text="Indikator berwarna hijau menandakan jika indikator telah mencapai target" />
        <SubHeader text="Indikator berwarna merah menandakan jika indikator belum mencapai target" />
      </Box>
    </Card>
  );
};

export default ChartSection;
