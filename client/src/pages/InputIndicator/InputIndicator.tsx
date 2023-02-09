import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/Helmet';
import { PageTitle } from '@/components/Typography';

import BulkInputSection from './BulkInputSection';
import FormInputSection from './FormInputSection';

const InputIndicator: FC = () => {
  return (
    <>
      <Helmet title="Input Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Input Indikator"
          subTitle="Masukkan data indikator kedalam sistem"
        />
        <BulkInputSection />
        <FormInputSection />
      </Container>
    </>
  );
};

export default InputIndicator;
