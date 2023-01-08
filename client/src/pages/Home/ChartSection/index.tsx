import Chart from 'react-apexcharts';
import type { FC } from 'react';

import { Grid, Box, Typography } from '@mui/material';

import SimpleCard from '@/components/Card/SimpleCard';
import { useChart } from '@/utils/useChart';
import { ERROR, SUCCESS } from '@/theme/Colors';

const ChartSection: FC = () => {
  const chartOptions = useChart({
    colors: [SUCCESS.main, ERROR.main],
    fill: { type: 'gradient' },
  });

  const charts = {
    options: {
      xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'Indikator yang memenuhi target',
        data: [
          {
            x: 2009,
            y: 54,
          },
          {
            x: 2010,
            y: 66,
          },
          {
            x: 2011,
            y: 78,
          },
          {
            x: 2012,
            y: 102,
          },
          {
            x: 2013,
            y: 90,
          },
          {
            x: 2014,
            y: 20,
          },
        ],
      },
      {
        name: 'Indikator yang belum memenuhi target',
        data: [
          {
            x: 2009,
            y: 10,
          },
          {
            x: 2010,
            y: 20,
          },
          {
            x: 2011,
            y: 30,
          },
          {
            x: 2012,
            y: 50,
          },
          {
            x: 2013,
            y: 12,
          },
          {
            x: 2014,
            y: 70,
          },
        ],
      },
    ],
  };

  const donutChart = {
    options: {
      labels: ['Memenuhi Target', 'Belum Memenuhi Target'],
    },
    series: [78, 56],
  };

  return (
    <Box>
      <Typography variant="h6">Statistik Perkembangan Indikator</Typography>
      {/* <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 2 }}>
        Menampilkan grafik perkembangan seluruh indikator
      </Typography> */}
      <Grid container spacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <SimpleCard>
            <Chart options={chartOptions} series={charts.series} type="area" />
          </SimpleCard>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <SimpleCard title="Indikator yang belum memenuhi target">
            <Chart options={chartOptions} series={charts.series} type="area" />
          </SimpleCard>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ChartSection;
