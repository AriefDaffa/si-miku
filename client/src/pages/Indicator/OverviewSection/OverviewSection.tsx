import { useMemo } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';

import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import CardCount from '@/components/UI/molecules/CardCount';
import CustomChart from '@/components/UI/atoms/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';
import { ERROR, PRIMARY, SUCCESS } from '@/components/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import type { IndicatorNormalized } from '@/repository/query/IndicatorQuery';

interface OverviewSectionProps {
  data: IndicatorNormalized;
}

const OverviewSection: FC<OverviewSectionProps> = (props) => {
  const { data } = props;

  //   const chartOptions = useChartStyle({
  //     legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
  //     dataLabels: { enabled: false, dropShadow: { enabled: false } },
  //     colors: [SUCCESS.dark, ERROR.dark],
  //     labels: ['Jumlah indikator Fakultas', 'Jumlah indikator Departemen'],
  //     markers: {
  //       size: 5,
  //     },
  //     chart: {
  //       animations: {
  //         enabled: false,
  //       },
  //     },
  //   });

  //   const series = [
  //     data.splittedList.facultyIndicator.length,
  //     data.splittedList.majorIndicator.length,
  //   ];

  return (
    <Grid
      spacing={1}
      sm={[4, 8]}
      gridItem={[
        <CardCount
          title="Total indikator"
          backgroundColor={PRIMARY.main}
          color={'white'}
          value={data.indicatorList.length}
          Icon={TrackChangesIcon}
        />,
        <Grid
          spacing={1}
          sx={{ height: '100%' }}
          gridItem={[
            <CardCount
              title="Jumlah indikator fakultas"
              backgroundColor={'white'}
              color={PRIMARY.main}
              value={data.splittedList.facultyIndicator.length}
              Icon={AccountBalanceIcon}
              variant="secondary"
            />,
            <CardCount
              title="Jumlah indikator Departemen"
              backgroundColor={'white'}
              color={PRIMARY.main}
              value={data.splittedList.majorIndicator.length}
              Icon={SchoolIcon}
              variant="secondary"
            />,
          ]}
        />,
      ]}
    />
  );
};

export default OverviewSection;
