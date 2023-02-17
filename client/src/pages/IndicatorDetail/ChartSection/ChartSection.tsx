import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import useChartStyle from '@/hooks/use-chart-style';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import CustomChart from '@/components/CustomChart';
import { Header } from '@/components/Typography';
import { ERROR, GREY, SUCCESS } from '@/theme/Colors';
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
    fill: { type: 'gradient' },
    markers: {
      size: 5,
    },
  });

  //   const series = useMemo(() => {
  //     return [
  //       {
  //         name: 'Indikator memenuhi target',
  //         data: indicatorData.indicatorMajors.map((item) => {
  //           return {
  //             x: item.yearValue,
  //             y: item.fulfilled,
  //           };
  //         }),
  //       },
  //       {
  //         name: 'Indikator belum memenuhi target',
  //         data: years.map((item) => {
  //           return {
  //             x: item.yearValue,
  //             y: item.failed,
  //           };
  //         }),
  //       },
  //     ];
  //   }, [years]);

  return (
    <CustomCard sx={{ mb: 2 }}>
      <Stack>
        <Header text="Perkembangan Indikator" />
      </Stack>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <CustomGrid
          spacing={1}
          gridItem={[
            <CustomCard>
              <div>
                {/* <CustomChart
                  chartOptions={chartOptions}
                  series={series}
                  type="area"
                  height={400}
                /> */}
              </div>
            </CustomCard>,
            // indicator.indicatorMajors.map((item, idx) => (
            //   <Box key={idx} sx={{ mb: 1 }}>
            //     <CustomCard>{item.major.majorName}</CustomCard>
            //   </Box>
            // )),
          ]}
        />
      </Box>
    </CustomCard>
  );
};

export default ChartSection;
