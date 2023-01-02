import { Helmet } from 'react-helmet';
import type { FC } from 'react';

import { Container, Typography, Box, Grid } from '@mui/material';

import ToolbarSection from './ToolbarSection';

const Indicator: FC = () => {
  return (
    <>
      <Helmet>
        <title>List Indikator | SI-MIKU</title>
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
            <Typography variant="h2">Detail Indikator</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
              Menampilkan data lebih lanjut mengenai indikator
            </Typography>
          </Box>
        </Box>

        <ToolbarSection />
      </Container>
    </>
  );
};

export default Indicator;
