import { Helmet } from 'react-helmet';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/Typography';

import FormSection from './FormSection';
import ToolbarSection from './ToolbarSection';
import CustomGrid from '@/components/CustomGrid';

const InputIndicator: FC = () => {
  return (
    <>
      <Helmet>
        <title>Input Indikator | SI-MIKU</title>
      </Helmet>
      <Container maxWidth="xl">
        <PageTitle
          title="Input Indikator"
          subTitle="Masukkan data indikator kedalam sistem"
        />
        <CustomGrid gridItem={[<ToolbarSection />, <FormSection />]} />
      </Container>
    </>
  );
};

export default InputIndicator;
