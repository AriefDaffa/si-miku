import type { FC } from 'react';

import { Container } from '@mui/material';

import { PageTitle } from '@/components/Typography';
import Helmet from '@/components/Helmet';
import useIndicatorCountQuery from '@/repository/query/IndicatorCountQuery';
import useYearQuery from '@/repository/query/YearQuery';

import CardCountSection from './CardCountSection';
import JurusanSection from './JurusanSection';

const Home: FC = () => {
  const { data: year } = useYearQuery();
  const { data: indicator } = useIndicatorCountQuery();

  return (
    <Container maxWidth="xl">
      <Helmet title="Dashboard | SI-MIKU" />
      <PageTitle
        title="Overview"
        subTitle="Menampilkan Overview indikator semua jurusan"
      />
      <CardCountSection year={year} indicator={indicator} />
      <JurusanSection />
    </Container>
  );
};

export default Home;
