import type { FC } from 'react';

import { Grid, Box, Typography, Avatar, LinearProgress } from '@mui/material';

import { CountCard } from '@/components/Card';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { ERROR, SUCCESS, PRIMARY } from '@/theme/Colors';
import SimpleCard from '@/components/Card/SimpleCard';
import CustomChart from '@/components/CustomChart';

const CardCountSection: FC = () => {
  const chartOptions = {
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.main],
    labels: ['Indikator Memenuhi Target', 'Indikator Belum Memenuhi Target'],
  };

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
        <Grid item xs={12} md={6}>
          <Grid
            container
            justifyContent="space-between"
            gap={3}
            sx={{ height: '100%' }}
          >
            {DATA.map((data, idx) => (
              <Grid key={idx} item xs={12}>
                <CountCard
                  title={data.title}
                  value={data.value}
                  Icon={data.Icon}
                  iconColor={data.iconColor}
                  withStat={false}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleCard isCenter title="Overview Grafik">
            <CustomChart
              type="pie"
              chartOptions={chartOptions}
              series={[78, 56]}
              width={400}
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardCountSection;
