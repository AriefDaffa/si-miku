import type { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Helmet from '@/components/UI/atoms/Helmet';
import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import { Header, PageTitle } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';

import BulkInputSection from './BulkInputSection';
import FormInputSection from './FormInputSection';
import FormInputDataSection from './FormInputDataSection';

const InputIndicator: FC = () => {
  return (
    <>
      <Helmet title="Input Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Input Indikator"
          subTitle="Masukkan data indikator kedalam sistem"
        />
        <Card sx={{ mb: 2 }}>
          <Header text={`Tambah indikator baru`} />
          <Box
            sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}
          >
            <Grid
              spacing={1}
              gridItem={[<BulkInputSection />, <FormInputSection />]}
            />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default InputIndicator;
