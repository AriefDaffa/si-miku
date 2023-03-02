import type { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Helmet from '@/components/UI/Helmet';
import CustomCard from '@/components/UI/CustomCard';
import CustomGrid from '@/components/UI/CustomGrid';
import { Header, PageTitle } from '@/components/UI/Typography';
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
        <CustomCard sx={{ mb: 2 }}>
          <Header text={`Tambah indikator baru`} />
          <Box
            sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}
          >
            <CustomGrid
              spacing={1}
              gridItem={[<BulkInputSection />, <FormInputSection />]}
            />
          </Box>
        </CustomCard>
        {/* <CustomCard>
          <Header text={`Tambah data indikator`} />
          <Box
            sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}
          >
            <CustomGrid spacing={1} gridItem={[<FormInputDataSection />]} />
          </Box>
        </CustomCard> */}
      </Container>
    </>
  );
};

export default InputIndicator;
