import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Container, Typography } from '@mui/material';

import CardCountSection from './CardCountSection';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | SI-Miku</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
          Dashboard
        </Typography>
        <Typography variant="h2">Indikator Kinerja Utama</Typography>

        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
          Menampilkan Overview indikator
        </Typography>

        <CardCountSection />
      </Container>
    </>
  );
};

export default Home;
