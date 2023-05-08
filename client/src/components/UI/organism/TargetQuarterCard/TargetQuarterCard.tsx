import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import Grid from '@/presentation/global-component/UI/Grid';
import Pill from '@/presentation/global-component/UI/Pill';
import CustomChart from '@/presentation/global-component/UI/CustomChart';
import useChartStyle from '@/controller/hooks/use-chart-style';
import { getPercentage } from '@/controller/utils/get-percentage';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { IndicatorFacultiesNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

import AvatarTitle from '../AvatarTitle';

interface TargetQuarterCardProps {
  data: IndicatorFacultiesNormalized[];
  fulfilled: number;
  failed: number;
  notSet: number;
}

const TargetQuarterCard: FC<TargetQuarterCardProps> = (props) => {
  const { data } = props;

  const [item]: IndicatorFacultiesNormalized[] = data;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
    colors: [PRIMARY.main],
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator',
        data: [
          {
            x: 'Q1',
            y: item.targetFaculties[0].targetQuarter.q1,
          },
          {
            x: 'Q2',
            y: item.targetFaculties[0].targetQuarter.q2,
          },
          {
            x: 'Q3',
            y: item.targetFaculties[0].targetQuarter.q3,
          },
          {
            x: 'Q4',
            y: item.targetFaculties[0].targetQuarter.q4,
          },
        ],
      },
    ];
  }, [item]);

  const totalData = useMemo(() => {
    return (
      item.targetFaculties[0].targetQuarter.q1 +
      item.targetFaculties[0].targetQuarter.q2 +
      item.targetFaculties[0].targetQuarter.q3 +
      item.targetFaculties[0].targetQuarter.q4
    );
  }, [item]);

  const target = useMemo(
    () => item.targetFaculties[0].targetQuarter.targetValue,
    [item]
  );

  const percentage = useMemo(() => {
    const data = getPercentage(totalData, target);

    return data > 100 ? 100 : data;
  }, [item]);

  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <AvatarTitle
          isImageIcon
          imageURL=""
          subHeader="Overview"
          header="Status indikator"
          Icon={TrendingUpIcon}
        />
        <Box sx={{ p: 1, mt: 2, backgroundColor: GREY[200], borderRadius: 2 }}>
          <Grid
            sm={[6, 6]}
            spacing={1}
            gridItem={[
              <Card sx={{ p: 2 }}>
                <SubHeader text="Total data (Q1 - Q4)" />
                <Stack
                  flexDirection="row"
                  alignItems="end"
                  justifyContent="center"
                >
                  <Header text={`${totalData}`} variant="h1" />
                  <Header text={`/${target}`} variant="h4" />
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={percentage} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Header text={`${percentage}%`} variant="body1" />
                  </Box>
                </Box>
              </Card>,
              <Card sx={{ p: 2, height: '100%' }}>
                <SubHeader text="Status" />
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: '100%' }}
                >
                  <Pill
                    isNotAdded={
                      item.targetFaculties[0].targetQuarter.year.yearID === 0
                    }
                    isError={
                      item.targetFaculties[0].targetQuarter
                        .isTargetFulfilled === false
                    }
                  >
                    <Header
                      variant="subtitle2"
                      text={`${
                        item.targetFaculties[0].targetQuarter.year.yearID === 0
                          ? 'Belum ditambahkan'
                          : item.targetFaculties[0].targetQuarter
                              .isTargetFulfilled === true
                          ? 'Memenuhi'
                          : 'Belum Memenuhi'
                      }`}
                    />
                  </Pill>
                </Stack>
              </Card>,
            ]}
          />
        </Box>
      </Card>
      <Card sx={{ p: 2, my: 2 }}>
        <AvatarTitle
          isImageIcon
          imageURL=""
          header="Perkembangan indikator"
          subHeader="Grafik"
          Icon={BarChartIcon}
        />
        <Box>
          <CustomChart
            chartOptions={chartOptions}
            series={series}
            type="bar"
            height={400}
          />
        </Box>
        <Box sx={{ p: 1, backgroundColor: GREY[200], borderRadius: 2 }}>
          <Grid
            spacing={1}
            sm={[3, 3, 3, 3]}
            gridItem={[
              <Card sx={{ p: 2 }}>
                <SubHeader text={'Data Kuartil 1'} />
                <Header
                  text={`${item.targetFaculties[0].targetQuarter.q1}`}
                  variant="h3"
                />
                <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                  <SubHeader text="Januari - Maret" />
                </Box>
              </Card>,
              <Card sx={{ p: 2 }}>
                <SubHeader text={'Data Kuartil 2'} />
                <Header
                  text={`${item.targetFaculties[0].targetQuarter.q2}`}
                  variant="h3"
                />
                <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                  <SubHeader text="April - Juni" />
                </Box>
              </Card>,
              <Card sx={{ p: 2 }}>
                <SubHeader text={'Data Kuartil 3'} />
                <Header
                  text={`${item.targetFaculties[0].targetQuarter.q3}`}
                  variant="h3"
                />
                <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                  <SubHeader text="Juli - September" />
                </Box>
              </Card>,
              <Card sx={{ p: 2 }}>
                <SubHeader text={'Data Kuartil 4'} />
                <Header
                  text={`${item.targetFaculties[0].targetQuarter.q4}`}
                  variant="h3"
                />
                <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                  <SubHeader text="Oktober - Desember" />
                </Box>
              </Card>,
            ]}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default TargetQuarterCard;
