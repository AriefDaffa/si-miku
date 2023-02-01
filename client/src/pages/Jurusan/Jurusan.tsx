import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/Typography';

import CustomGrid from '@/components/CustomGrid';
import Helmet from '@/components/Helmet';
import ChartSection from './ChartSection';

const Jurusan: FC = () => {
  return (
    <>
      <Helmet title="Jurusan | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Jurusan"
          subTitle="Lihat perkembangan indikator berdasarkan jurusan"
        />
        <ChartSection />
      </Container>
    </>
  );
};

export default Jurusan;
