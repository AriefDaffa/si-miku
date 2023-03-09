import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/UI/atoms/Typography';

import Grid from '@/components/UI/atoms/Grid';
import Helmet from '@/components/UI/atoms/Helmet';
import useMajorOverviewQuery from '@/repository/query/MajorOverviewQuery';

import ChartSection from './ChartSection';
import TableSection from './TableSection';

const Jurusan: FC = () => {
  const { data: major, isLoading: isMajorLoading } = useMajorOverviewQuery();

  return (
    <>
      <Helmet title="Jurusan | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Jurusan"
          subTitle="Lihat perkembangan indikator berdasarkan jurusan"
        />
        <ChartSection majorData={major} />
        <TableSection majorData={major} isLoading={isMajorLoading} />
      </Container>
    </>
  );
};

export default Jurusan;
