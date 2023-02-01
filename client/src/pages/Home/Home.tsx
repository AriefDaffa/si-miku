import type { FC } from 'react';

import { Container } from '@mui/material';

import { PageTitle } from '@/components/Typography';
import Helmet from '@/components/Helmet';
import useIndicatorCountQuery from '@/repository/query/IndicatorCountQuery';
import useMajorOverviewQuery from '@/repository/query/MajorOverviewQuery';
import useYearQuery from '@/repository/query/YearQuery';

import CardCountSection from './CardCountSection';
import JurusanSection from './JurusanSection';

const Home: FC = () => {
  // const { data: year } = useYearQuery();
  const { data: indicator } = useIndicatorCountQuery();
  const { data: major } = useMajorOverviewQuery();

  return (
    <Container maxWidth="xl">
      <Helmet title="Dashboard | SI-MIKU" />
      <PageTitle
        title="Overview"
        subTitle="Menampilkan Overview indikator semua jurusan"
      />
      <CardCountSection indicator={indicator} major={major} />
      {/* <JurusanSection /> */}
    </Container>
  );
};

export default Home;
