import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { FC } from 'react';

import { Grid, Typography } from '@mui/material';

import { useChart } from '@/utils/useChart';
import { ERROR, PRIMARY, SUCCESS } from '@/theme/Colors';
import SimpleCard from '@/components/Card/SimpleCard';
import type { IndicatorByYearNormalized } from '@/repository/query/IndicatorByYearQuery/types';

interface ChartSectionProps {
  indicatorData: IndicatorByYearNormalized;
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { indicatorData } = props;

  //   const pieOptions = useChart({
  //     legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
  //     colors: [SUCCESS.dark, ERROR.main],
  //     labels: ['Indikator Memenuhi Target', 'Indikator Belum Memenuhi Target'],
  //   });

  const options = useChart({
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
      },
    },
  });

  const series = useMemo(() => {
    const defaultVal = [
      {
        name: '',
        data: [
          {
            x: '',
            y: 0,
            fillColor: '',
            strokeColor: '',
            goals: [{ name: '', value: 0, strokeColor: '', strokeHeight: 0 }],
          },
        ],
      },
    ];

    if (!indicatorData.indicator.length) {
      return defaultVal;
    }

    defaultVal[0].data.shift();

    indicatorData.indicator.map((data) => {
      const total =
        data.quarterOne +
        data.quarterTwo +
        data.quarterThree +
        data.quarterFour;

      defaultVal[0].data.push({
        x: `ID Indikator: ${data.indicatorId}`,
        y: total,
        fillColor: total >= data.target ? SUCCESS.main : ERROR.main,
        strokeColor: total >= data.target ? SUCCESS.main : ERROR.main,
        goals: [
          {
            name: 'Target',
            value: data.target,
            strokeColor: PRIMARY.main,
            strokeHeight: 4,
          },
        ],
      });
    });

    return defaultVal;
  }, [indicatorData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <SimpleCard title="Grafik perkembangan indikator" withHeader>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Grafik indikator pada tahun
          </Typography>
          <Chart options={options} series={series} type="bar" />
        </SimpleCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleCard title="Jumlah Indikator" withHeader>
          {/* <Chart options={pieOptions} series={[78, 80]} type="pie" /> */}
        </SimpleCard>
      </Grid>
    </Grid>
  );
};

export default ChartSection;
