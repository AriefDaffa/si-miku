import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Container } from '@mui/material';

import { MainHeader } from '@/components/Typography';
import useIndicatorCountQuery from '@/repository/query/IndicatorCountQuery';

import CardCountSection from './CardCountSection';
import ChartSection from './ChartSection';

const Home: FC = () => {
  const { data, isLoading } = useIndicatorCountQuery();

  return (
    <>
      <Helmet>
        <title>Dashboard | SI-Miku</title>
      </Helmet>
      <Container maxWidth="xl">
        <MainHeader
          title="Overview"
          subTitle="Menampilkan Overview indikator semua jurusan"
        />
        <CardCountSection
          totalIndicator={data.total}
          failedIndicator={data.failed}
          successIndicator={data.success}
          isLoading={isLoading}
        />
        <ChartSection />
      </Container>
    </>
  );
};

export default Home;
