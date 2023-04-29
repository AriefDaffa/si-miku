import type { FC } from 'react';

import Container from '@mui/material/Container';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import { PageTitle } from '@/components/UI/atoms/Typography';
import {
  ERROR,
  PRIMARY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';

import useOverviewIndicatorQuery from '@/repository/query/OverviewIndicator';
import ChartSection from './ChartSection';
import CardCount from './CardCount';

const Home: FC = () => {
  const { data: indicatorOverview, isLoading: isIndicatorOverviewLoading } =
    useOverviewIndicatorQuery();

  return (
    <Container maxWidth="xl">
      <Helmet title="Dashboard | SI-MIKU" />
      <PageTitle
        title="Overview"
        subTitle="Menampilkan perkembangan seluruh indikator"
      />
      <Grid spacing={2} gridItem={[]} />
    </Container>
  );
};

export default Home;
