import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import type { FC } from 'react';

import { Grid, Box, Typography, Avatar, LinearProgress } from '@mui/material';

import { CountCard } from '@/components/Card';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { ERROR, GREY, PRIMARY, SUCCESS } from '@/theme/Colors';
import SimpleCard from '@/components/Card/SimpleCard';

const CardCountSection: FC = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Memenuhi target', 'Belum Memenuhi Target'],
    datasets: [
      {
        label: '# of Votes',
        data: [78, 56],
        backgroundColor: [SUCCESS.main, ERROR.main],
        // borderColor: [SUCCESS.lighter, ERROR.lighter],
        borderWidth: 0,
      },
    ],
  };

  const devices = [
    {
      title: 'Memenuhi target',
      value: 63,
      color: SUCCESS.main,
    },
    {
      title: 'Belum Memenuhi Target',
      value: 15,
      color: ERROR.main,
    },
  ];

  const DATA = [
    {
      title: 'Total Indikator',
      value: '124',
      iconColor: PRIMARY.main,
      Icon: TrackChangesIcon,
    },
    {
      title: 'Indikator Memenuhi Target',
      value: '78',
      iconColor: SUCCESS.main,
      Icon: DoneAllIcon,
    },
    {
      title: 'Indikator Belum Memenuhi Target',
      value: '56',
      iconColor: ERROR.main,
      Icon: DoNotDisturbIcon,
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={4}>
          <SimpleCard isCenter>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography color="textPrimary" variant="h1">
                124
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
                sx={{ overflowWrap: 'break-word' }}
              >
                Total Indikator
              </Typography>

              <LinearProgress value={80} variant="determinate" />
            </Box>
          </SimpleCard>
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <SimpleCard isCenter>
            <Doughnut data={data} />
          </SimpleCard>
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <Grid container spacing={3}> */}
        {DATA.map((data, idx) => (
          <Grid key={idx} item xs={12} md={4}>
            <CountCard
              title={data.title}
              value={data.value}
              Icon={data.Icon}
              iconColor={data.iconColor}
              // withStat={idx === 0 ? false : true}
              withStat={false}
            />
          </Grid>
        ))}
        {/* </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default CardCountSection;
