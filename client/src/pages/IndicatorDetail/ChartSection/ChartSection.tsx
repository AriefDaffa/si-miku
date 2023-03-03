import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import useChartStyle from '@/hooks/use-chart-style';
import Card from '@/components/UI/Card';
import Grid from '@/components/UI/Grid';
import CustomChart from '@/components/UI/CustomChart';
import { Header } from '@/components/UI/Typography';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorByIdNormalized } from '@/repository/query/IndicatorByIdQuery/types';
import type { YearDataNormalized } from '@/repository/query/YearQuery/types';

interface ChartSectionProps {
  isIndicatorLoading: boolean;
  isYearLoading: boolean;
  indicatorData: IndicatorByIdNormalized;
  yearData: YearDataNormalized[];
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { indicatorData, yearData, isIndicatorLoading, isYearLoading } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.dark],
    markers: {
      size: 5,
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: indicatorData.indicatorMajors.map((item) => {
          return {
            x: item.major.majorName,
            y: item.total.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: indicatorData.indicatorMajors.map((item) => {
          return {
            x: item.major.majorName,
            y: item.total.failed,
          };
        }),
      },
    ];
  }, [indicatorData]);

  return (
    <Card sx={{ mb: 2 }}>
      <Stack>
        <Header text="Perkembangan Indikator" />
      </Stack>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <Grid
          spacing={1}
          gridItem={[
            <Card>
              <div>
                <CustomChart
                  chartOptions={chartOptions}
                  series={series}
                  type="bar"
                  height={400}
                />
              </div>
            </Card>,
            // indicator.indicatorMajors.map((item, idx) => (
            //   <Box key={idx} sx={{ mb: 1 }}>
            //     <Card>{item.major.majorName}</Card>
            //   </Box>
            // )),
          ]}
        />
      </Box>
    </Card>
  );
};

export default ChartSection;
