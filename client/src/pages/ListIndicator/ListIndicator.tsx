import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/Typography';
import CustomGrid from '@/components/CustomGrid';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import Helmet from '@/components/Helmet';

import TableSection from './TableSection';

const ListIndicator: FC = () => {
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

export default ListIndicator;
