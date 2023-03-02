import type { FC } from 'react';

import Container from '@mui/material/Container';

import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import Helmet from '@/components/UI/Helmet';
import { PageTitle } from '@/components/UI/Typography';

import TableSection from './TableSection';

const Indicator: FC = () => {
  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorQuery();

  return (
    <>
      <Helmet title="List Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="List Indikator"
          subTitle="Menampilkan list indikator yang terdapat pada sistem"
        />
        <TableSection data={indicator} isLoading={isIndicatorLoading} />
      </Container>
    </>
  );
};

export default Indicator;
