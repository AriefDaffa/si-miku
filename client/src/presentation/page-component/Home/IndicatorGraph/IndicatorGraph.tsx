import { useMemo, Fragment } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReportIcon from '@mui/icons-material/Report';
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
import Grid from '@/presentation/global-component/UI/Grid/Grid';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import YearPicker from '@/presentation/global-component/UI/YearPicker/YearPicker';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';

interface IndicatorGraphProps {
  indicatorTotal: number;
  currentYear: string;
  indicatorFulfilled: number;
  indicatorFailed: number;
  handleSelectYear: (year: string | null) => void;
}

const IndicatorGraph: FC<IndicatorGraphProps> = (props) => {
  const {
    indicatorTotal,
    indicatorFailed,
    indicatorFulfilled,
    currentYear,
    handleSelectYear,
  } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
    labels: [
      'Data indikator memenuhi target',
      'Data indikator belum memenuhi target',
      'Data indikator belum ditambahkan',
    ],
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
      indicatorFulfilled,
      indicatorFailed,
      indicatorTotal - (indicatorFailed + indicatorFulfilled),
    ];
  }, [indicatorFulfilled, indicatorFailed, indicatorTotal]);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between">
        <AvatarTitle
          isImageIcon
          header={`Perkembangan Indikator Tahun ${currentYear}`}
          imageURL=""
          subHeader="Grafik"
          Icon={TrendingUpIcon}
        />
        <Stack justifyContent="center">
          <YearPicker
            yearValue={currentYear}
            handleSelectYear={handleSelectYear}
          />
        </Stack>
      </Stack>
      <Grid
        sm={[8, 4]}
        spacing={1}
        sx={{ mt: 1 }}
        gridItem={[
          <Card sx={{ p: 1 }}>
            <Box>
              <CustomChart
                chartOptions={chartOptions}
                series={series}
                type="pie"
                height={400}
              />
            </Box>
          </Card>,
          <Stack gap={1} sx={{ height: '100%' }}>
            <Card sx={{ height: '100%' }}>
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <Stack
                  alignItems="center"
                  sx={{
                    m: 1,
                    p: 1,
                    backgroundColor: SUCCESS.light,
                    borderRadius: 1,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: '60px', color: SUCCESS.darker }}
                  />
                </Stack>
                <Box>
                  <SubHeader text="Jumlah data memenuhi target" />
                  <Header text={`${indicatorFulfilled}`} variant="h4" />
                </Box>
              </Stack>
            </Card>
            <Card sx={{ height: '100%' }}>
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <Stack
                  alignItems="center"
                  sx={{
                    m: 1,
                    p: 1,
                    backgroundColor: ERROR.light,
                    borderRadius: 1,
                  }}
                >
                  <HighlightOffIcon
                    sx={{ fontSize: '60px', color: ERROR.darker }}
                  />
                </Stack>
                <Box>
                  <SubHeader text="Jumlah data belum memenuhi target" />
                  <Header text={`${indicatorFailed}`} variant="h4" />
                </Box>
              </Stack>
            </Card>
            <Card sx={{ height: '100%' }}>
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <Stack
                  alignItems="center"
                  sx={{
                    m: 1,
                    p: 1,
                    backgroundColor: GREY[400],
                    borderRadius: 1,
                  }}
                >
                  <ReportIcon sx={{ fontSize: '60px', color: GREY[800] }} />
                </Stack>
                <Box>
                  <SubHeader text="Jumlah data belum ditambahkan" />
                  <Header
                    text={`${
                      indicatorTotal - (indicatorFailed + indicatorFulfilled)
                    }`}
                    variant="h4"
                  />
                </Box>
              </Stack>
            </Card>
          </Stack>,
        ]}
      />
    </Box>
  );
};

export default IndicatorGraph;
