import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Container, Typography, Box } from '@mui/material';

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'middle',
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              Dashboard
            </Typography>
            <Typography variant="h2">Overview</Typography>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
              Menampilkan Overview indikator semua jurusan
            </Typography>
          </Box>
        </Box>

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
