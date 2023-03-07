import { useState } from 'react';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';

import Helmet from '@/components/UI/Helmet';
import Grid from '@/components/UI/Grid';
import { PageTitle } from '@/components/UI/Typography';
import { PRIMARY } from '@/components/theme/Colors';

import useOverviewIndicatorQuery from '@/repository/query/OverviewIndicator';
import useIndicatorQuery from '@/repository/query/IndicatorQuery/useIndicatorQuery';
import ChartSection from './ChartSection';
import CardCount from './CardCount';

const Home: FC = () => {
  const [tablePageAndSize, setTablePageAndSize] = useState({
    size: 10,
    page: 0,
  });

  const { data: indicatorOverview, isLoading: isIndicatorOverviewLoading } =
    useOverviewIndicatorQuery();

  return (
    <Container maxWidth="xl">
      <Helmet title="Dashboard | SI-MIKU" />
      <PageTitle
        title="Overview"
        subTitle="Menampilkan perkembangan seluruh indikator"
      />
      <Grid
        spacing={2}
        sm={[4, 4, 4]}
        gridItem={[
          <CardCount
            title="Total indikator"
            backgroundColor={PRIMARY.main}
            color={'white'}
            value={50}
            Icon={TrackChangesIcon}
          />,
          <CardCount
            title="Jumlah indikator fakultas"
            backgroundColor={'white'}
            color={PRIMARY.main}
            value={10}
            Icon={AccountBalanceIcon}
          />,
          <CardCount
            title="Jumlah indikator jurusan"
            backgroundColor={'white'}
            color={PRIMARY.main}
            value={40}
            Icon={SchoolIcon}
          />,
          <ChartSection
            isLoading={isIndicatorOverviewLoading}
            IndicatorOverview={indicatorOverview}
          />,
        ]}
      />
    </Container>
  );
};

export default Home;
