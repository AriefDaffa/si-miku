import Chart from 'react-apexcharts';
import type { FC } from 'react';

import { Grid } from '@mui/material';

import SimpleCard from '@/components/Card/SimpleCard';

const ChartSection: FC = () => {
  const charts = {
    options: {
      xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'Indikator',
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
    ],
  };

  const donutChart = {
    options: {
      //   labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    },
    series: [44, 55, 41, 17, 15],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SimpleCard title="Indikator Kinerja Utama Per-tahun">
          <Chart options={charts.options} series={charts.series} type="bar" />
        </SimpleCard>
      </Grid>
      {/* <Grid item lg={4} xs={12}>
        <SimpleCard title="Progress Bar">
          <Chart
            options={donutChart.options}
            series={donutChart.series}
            type="donut"
          />
        </SimpleCard>
      </Grid> */}
    </Grid>
  );
};

export default ChartSection;
