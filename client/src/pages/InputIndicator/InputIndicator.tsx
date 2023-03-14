import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import { PageTitle } from '@/components/UI/atoms/Typography';

import BulkInput from './BulkInput';
import FormInput from './FormInput';

const InputIndicator: FC = () => {
  return (
    <>
      <Helmet title="Input Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Input Indikator"
          subTitle="Masukkan data indikator kedalam sistem"
        />
        <Grid spacing={1} gridItem={[<BulkInput />, <FormInput />]} />
      </Container>
    </>
  );
};

export default InputIndicator;
