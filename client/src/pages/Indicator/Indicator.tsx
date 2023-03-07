import type { FC } from 'react';

import Container from '@mui/material/Container';

import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import Helmet from '@/components/UI/Helmet';
import Grid from '@/components/UI/Grid';
import { PageTitle } from '@/components/UI/Typography';

import TableSection from './TableSection';

const Indicator: FC = () => {
  const { data: listIndicator, isLoading: isListIndicatorLoading } =
    useIndicatorQuery();

  return (
    <>
      <Helmet title="List Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="List Indikator"
          subTitle="Menampilkan seluruh data indikator yang terdapat pada sistem"
        />
        <Grid
          spacing={2}
          gridItem={[
            <TableSection
              data={listIndicator}
              isLoading={isListIndicatorLoading}
            />,
          ]}
        />
      </Container>
    </>
  );
};

export default Indicator;
