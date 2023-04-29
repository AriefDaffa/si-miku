import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import Grid from '@/presentation/global-component/UI/Grid';
import Flexer from '@/presentation/global-component/UI/Flexer';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import { Header } from '@/presentation/global-component/UI/Typography';
import CustomChart from '@/presentation/global-component/UI/CustomChart';
import useChartStyle from '@/controller/hooks/use-chart-style';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import StatusCard from './StatusCard/StatusCard';

const OverviewSection: FC = () => {
  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
    colors: [SUCCESS.dark, ERROR.main, GREY[800]],
    labels: [
      'Indikator memenuhi',
      'Indikator belum memenuhi',
      'indikator belum ditambahkan',
    ],
  });

  const series = useMemo(() => {
    return [10, 20, 25];
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <AvatarTitle
        isImageIcon
        Icon={TrendingUpIcon}
        header="Perkembangan Indikator"
        subHeader="Overview"
        imageURL=""
      />
      <Grid
        sx={{ mt: 1 }}
        sm={[8, 4]}
        spacing={1}
        gridItem={[
          <Card
            sx={{
              border: '1px solid #dadada',
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Flexer>
              <TextWithSubHeader header="Total Indikator" subHeader="Jumlah" />
              <Header text="68" variant="h2" />
            </Flexer>
            <Box
              sx={{
                p: 1,
                backgroundColor: GREY[200],
                borderRadius: 2,
                flex: 1,
              }}
            >
              <Grid
                spacing={1}
                sx={{ height: '100%' }}
                sm={[4, 4, 4]}
                gridItem={[
                  <StatusCard
                    cardType="success"
                    Icon={DoneAllIcon}
                    title="Indikator memenuhi target"
                    value="12"
                  />,
                  <StatusCard
                    cardType="error"
                    Icon={DoDisturbIcon}
                    title="Indikator belum memenuhi target"
                    value="13"
                  />,
                  <StatusCard
                    cardType="notSet"
                    Icon={SignalCellularAltIcon}
                    title="Indikator belum ditambahkan"
                    value="14"
                  />,
                ]}
              />
            </Box>
          </Card>,
          <Card
            sx={{
              border: '1px solid #dadada',
              p: 2,
            }}
          >
            <Header text="Grafik" variant="h6" sx={{ mb: 1 }} />
            <CustomChart
              chartOptions={chartOptions}
              series={series}
              type="donut"
              height={300}
            />
          </Card>,
        ]}
      />
    </Box>
  );
};

export default OverviewSection;
