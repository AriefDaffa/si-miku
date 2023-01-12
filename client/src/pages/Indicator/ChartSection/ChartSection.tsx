import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';

import useChartStyle from '@/hooks/use-chart-style';
import { ERROR, PRIMARY, SUCCESS } from '@/theme/Colors';
import SimpleCard from '@/components/Card/SimpleCard';
import type { IndicatorByIdResponseNormalized } from '@/repository/query/IndicatorByIdQuery/types';

interface ChartSectionProps {
  indicator: IndicatorByIdResponseNormalized;
  isLoading: boolean;
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { indicator, isLoading } = props;

  const options = useChartStyle({
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

    if (!indicator.years.length) {
      return defaultVal;
    }

    defaultVal[0].data.shift();

    indicator.years.map((data) => {
      const total =
        data.quarterOne +
        data.quarterTwo +
        data.quarterThree +
        data.quarterFour;

      defaultVal[0].data.push({
        x: `Tahun: ${data.yearId}`,
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
  }, [indicator]);

  return (
    <SimpleCard>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Grafik perkembangan Indikator per-tahun
      </Typography>
      <Chart options={options} series={series} type="bar" />
    </SimpleCard>
  );
};

export default ChartSection;
