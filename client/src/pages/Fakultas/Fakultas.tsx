import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/UI/atoms/Typography';

import Grid from '@/components/UI/atoms/Grid';
import Helmet from '@/components/UI/atoms/Helmet';
import TableCardProgress from '@/components/UI/molecules/TableCardProgress';
import useFakultasIndicatorQuery from '@/repository/query/FakultasIndicatorQuery';

import OverviewSection from './OverviewSection';

const Fakultas: FC = () => {
  const { data: fakultasData, isLoading: isFakultasLoading } =
    useFakultasIndicatorQuery();

  return (
    <>
      <Helmet title="Fakultas | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Indikator Fakultas"
          subTitle="Lihat perkembangan indikator Fakultas"
        />
        <OverviewSection data={fakultasData} isLoading={isFakultasLoading} />
        <TableCardProgress
          data={fakultasData.indicatorList}
          isLoading={isFakultasLoading}
        />
      </Container>
    </>
  );
};

export default Fakultas;
