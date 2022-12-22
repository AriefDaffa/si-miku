import type { FC } from 'react';

import { Grid, Box } from '@mui/material';

import { CountCard } from '@/components/Card';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { ERROR, PRIMARY, SUCCESS } from '@/theme/Colors';

const CardCountSection: FC = () => {
  const DATA = [
    {
      title: 'Jumlah Indikator',
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
        {DATA.map((data, idx) => (
          <Grid key={idx} item lg={4} sm={6} xl={4} xs={12}>
            <CountCard
              title={data.title}
              value={data.value}
              Icon={data.Icon}
              iconColor={data.iconColor}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardCountSection;
