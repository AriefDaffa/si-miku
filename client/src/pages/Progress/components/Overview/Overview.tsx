import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Grid from '@/components/UI/atoms/Grid';
import Flexer from '@/components/UI/atoms/Flexer';
import AvatarTitle from '@/components/UI/organism/AvatarTitle';
import {
  ERROR,
  GREY,
  PRIMARY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import CustomChart from '@/components/UI/atoms/CustomChart';
import useChartStyle from '@/controller/hooks/use-chart-style';
import TextWithSubHeader from '@/components/UI/molecules/TextWithSubHeader/TextWithSubHeader';

const Overview: FC = () => {
  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
    colors: [SUCCESS.dark, ERROR.main, GREY[800]],
    labels: [
      'Indikator memenuhi',
      'Indikator belum memenuhi',
      'indikator belum ditambahkan',
    ],
  });

  const series = useMemo(() => {
    return [10, 20, 25];
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <AvatarTitle
        isImageIcon
        Icon={TrendingUpIcon}
        header="Perkembangan Indikator"
        subHeader="Overview"
        imageURL=""
      />
      <Grid
        sx={{ mt: 1 }}
        sm={[8, 4]}
        spacing={1}
        gridItem={[
          <Card
            sx={{
              border: '1px solid #dadada',
              p: 2,
              height: '100%',
            }}
          >
            <Flexer>
              <TextWithSubHeader header="Total Indikator" subHeader="Jumlah" />
              <Header text="68" variant="h2" />
            </Flexer>
            <Box
              sx={{
                p: 1,
                backgroundColor: GREY[200],
                borderRadius: 2,
              }}
            >
              <Grid
                spacing={1}
                sx={{ height: '100%' }}
                sm={[4, 4, 4]}
                gridItem={[
                  <Card sx={{ px: 1, py: 2, height: '100%' }}>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ height: '100%' }}
                    >
                      <Flexer
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: SUCCESS.light,
                          color: SUCCESS.dark,
                          width: 'min-content',
                        }}
                      >
                        <DoneAllIcon sx={{ fontSize: '50px' }} />
                      </Flexer>
                      <SubHeader
                        text="Indikator memenuhi target"
                        sx={{ mt: 2 }}
                      />
                      <Header text="70" variant="h3" />
                    </Stack>
                  </Card>,
                  <Card sx={{ px: 1, py: 2, height: '100%' }}>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ height: '100%' }}
                    >
                      <Flexer
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: ERROR.light,
                          color: ERROR.dark,
                          width: 'min-content',
                        }}
                      >
                        <DoDisturbIcon sx={{ fontSize: '50px' }} />
                      </Flexer>
                      <SubHeader
                        text="Indikator belum memenuhi target"
                        sx={{ mt: 2, textAlign: 'center' }}
                      />
                      <Header text="70" variant="h3" />
                    </Stack>
                  </Card>,
                  <Card sx={{ px: 1, py: 2, height: '100%' }}>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ height: '100%' }}
                    >
                      <Flexer
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: GREY[400],
                          color: GREY[800],
                          width: 'min-content',
                        }}
                      >
                        <ErrorOutlineIcon sx={{ fontSize: '50px' }} />
                      </Flexer>
                      <SubHeader
                        text="Indikator belum ditambahkan"
                        sx={{ mt: 2, textAlign: 'center' }}
                      />
                      <Header text="70" variant="h3" />
                    </Stack>
                  </Card>,
                ]}
              />
            </Box>
          </Card>,
          <Card
            sx={{
              border: '1px solid #dadada',
              p: 2,
            }}
          >
            <Header text="Grafik" variant="h6" sx={{ mb: 1 }} />
            <CustomChart
              chartOptions={chartOptions}
              series={series}
              type="donut"
              // height={400}
            />
          </Card>,
        ]}
      />
    </Box>
  );
};

export default Overview;
