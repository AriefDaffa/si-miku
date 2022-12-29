import { Helmet } from 'react-helmet';
import type { FC } from 'react';

import { Container, Typography, Box } from '@mui/material';

const ListIndicator: FC = () => {
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
            <Typography variant="h2">List Indikator</Typography>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
              Menampilkan List Indikator yang terdapat pada sistem
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ListIndicator;
