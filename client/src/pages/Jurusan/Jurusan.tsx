import type { FC } from 'react';

import Container from '@mui/material/Container';

import { PageTitle } from '@/components/UI/atoms/Typography';

import Helmet from '@/components/UI/atoms/Helmet';
import OverviewCard from '@/components/UI/organism/OverviewCard';
import useOverviewMajorQuery from '@/repository/query/OverviewMajorQuery';

import ChartSection from './ChartSection';
import TableSection from './TableSection';

const Jurusan: FC = () => {
  const { data: majorData, isLoading: isMajorLoading } =
    useOverviewMajorQuery();

  return (
    <>
      <Helmet title="Jurusan | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="Jurusan"
          subTitle="Lihat perkembangan indikator berdasarkan jurusan"
        />
        <OverviewCard
          fulfilled={majorData.totalFulfilled}
          failed={majorData.totalFailed}
          isLoading={isMajorLoading}
        />
        <ChartSection majorData={majorData} isLoading={isMajorLoading} />
        <TableSection majorData={majorData} isLoading={isMajorLoading} />
      </Container>
    </>
  );
};

export default Jurusan;
