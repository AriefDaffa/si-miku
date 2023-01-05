import type { FC } from 'react';

import { Grid, Box, Typography, Avatar, LinearProgress } from '@mui/material';

import { CountCard } from '@/components/Card';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { ERROR, SUCCESS, PRIMARY } from '@/theme/Colors';
import SimpleCard from '@/components/Card/SimpleCard';
import CustomChart from '@/components/CustomChart';

interface CardCountSectionProps {
  totalIndicator: number;
  successIndicator: number;
  failedIndicator: number;
  isLoading: boolean;
}

const CardCountSection: FC<CardCountSectionProps> = (props) => {
  const { totalIndicator, successIndicator, failedIndicator, isLoading } =
    props;

  const chartOptions = {
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.main],
    labels: ['Indikator Memenuhi Target', 'Indikator Belum Memenuhi Target'],
  };

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
            <Grid item xs={12}>
              <CountCard
                title={'Total Indikator'}
                value={totalIndicator}
                Icon={TrackChangesIcon}
                iconColor={PRIMARY.main}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CountCard
                title={'Indikator Memenuhi Target'}
                value={successIndicator}
                Icon={DoneAllIcon}
                iconColor={SUCCESS.main}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CountCard
                title={'Indikator Belum Memenuhi Target'}
                value={failedIndicator}
                Icon={DoNotDisturbIcon}
                iconColor={ERROR.main}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleCard isCenter title="Overview Grafik">
            <CustomChart
              type="pie"
              chartOptions={chartOptions}
              series={[successIndicator, failedIndicator]}
              width={400}
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardCountSection;
