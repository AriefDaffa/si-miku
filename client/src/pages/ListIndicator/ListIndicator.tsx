import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/Typography';
import CustomGrid from '@/components/CustomGrid';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import Helmet from '@/components/Helmet';

import TableSection from './TableSection';
import ChartSection from './ChartSection';
import ToolbarSection from './ToolbarSection';

const ListIndicator: FC = () => {
  const { data, isLoading } = useIndicatorQuery();
  return (
    <>
      <Helmet title="List Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="List Indikator"
          subTitle="Menampilkan list indikator yang terdapat pada sistem"
        />
        {/* <CustomGrid
          gridItem={[<TableSection data={data} isLoading={isLoading} />]}
        /> */}
      </Container>
    </>
  );
};

export default ListIndicator;
