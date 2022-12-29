import Chart from 'react-apexcharts';
import type { FC } from 'react';

import { Grid } from '@mui/material';

import SimpleCard from '@/components/Card/SimpleCard';
import { useChart } from '@/utils/useChart';

const ChartSection: FC = () => {
  const chartOptions = useChart({});

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
      labels: ['Memenuhi Target', 'Belum Memenuhi Target'],
    },
    series: [78, 56],
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <SimpleCard title="Grafik Perkembangan Indikator" withHeader>
          <Chart options={chartOptions} series={charts.series} type="bar" />
        </SimpleCard>
      </Grid>
      {/* <Grid item lg={4} xs={12}>
        <SimpleCard title="Progress Bar">
          <Chart
            options={chartOptions}
            series={donutChart.series}
            type="donut"
          />
        </SimpleCard>
      </Grid> */}
    </Grid>
  );
};

export default ChartSection;
