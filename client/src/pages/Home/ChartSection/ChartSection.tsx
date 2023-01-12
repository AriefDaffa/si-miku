import { useState } from 'react';
import Chart from 'react-apexcharts';
import type { FC } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SelectChangeEvent } from '@mui/material/Select';

import SimpleCard from '@/components/Card/SimpleCard';
import useChartStyle from '@/hooks/use-chart-style';
import { ERROR, SUCCESS } from '@/theme/Colors';
import { SubHeader } from '@/components/Typography';

const ChartSection: FC = () => {
  const [chartType, setChartType] = useState<
    | 'area'
    | 'line'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | undefined
  >('area');
  const [jurusan, setJurusan] = useState('1');

  const chartOptions = useChartStyle({
    colors: [SUCCESS.main, ERROR.main],
    legend: { floating: false, horizontalAlign: 'left', position: 'bottom' },
    fill: { type: 'gradient' },
  });

  const charts = {
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

  const handleClick = (event: SelectChangeEvent) => {
    setChartType(
      event.target.value as
        | 'area'
        | 'line'
        | 'bar'
        | 'histogram'
        | 'pie'
        | 'donut'
        | 'radialBar'
        | 'scatter'
        | 'bubble'
        | 'heatmap'
        | 'treemap'
        | 'boxPlot'
        | 'candlestick'
        | 'radar'
        | 'polarArea'
        | 'rangeBar'
        | undefined
    );
  };

  const handleJurusan = (event: SelectChangeEvent) => {
    setJurusan(event.target.value as string);
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <SimpleCard>
            <SubHeader
              text="Statistik Perkembangan Indikator"
              onChange={handleClick}
              selectValue={chartType}
              menuItem={[
                { title: 'Area Chart', value: 'area' },
                { title: 'Bar Chart', value: 'bar' },
              ]}
              withSelect
            />
            <Chart
              options={chartOptions}
              series={charts.series}
              height={350}
              type={chartType}
            />
          </SimpleCard>
        </Grid>
      </Grid>
      <SubHeader
        text="Statistik Perkembangan Indikator Berdasarkan Jurusan"
        onChange={handleJurusan}
        selectValue={jurusan}
        menuItem={[
          { title: 'Teknik Informatika', value: '1' },
          { title: 'Teknik Komputer', value: '2' },
          { title: 'Sistem Informasi', value: '3' },
          { title: 'Teknologi Informasi', value: '4' },
          { title: 'Pendidikan Teknologi Informasi', value: '5' },
          { title: 'Magister Ilmu Komputer', value: '6' },
        ]}
        withSelect
      />
      <Grid container spacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <SimpleCard title="Indikator yang belum memenuhi target">
            <Chart
              options={chartOptions}
              series={charts.series}
              height={350}
              type="bar"
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChartSection;
