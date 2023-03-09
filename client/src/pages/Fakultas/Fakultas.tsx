import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/UI/atoms/Typography';

import Grid from '@/components/UI/atoms/Grid';
import Helmet from '@/components/UI/atoms/Helmet';

const Fakultas: FC = () => {
  return (
    <>
      <Helmet title="Fakultas | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Indikator Fakultas"
          subTitle="Lihat perkembangan indikator Fakultas"
        />
      </Container>
    </>
  );
};

export default Fakultas;
