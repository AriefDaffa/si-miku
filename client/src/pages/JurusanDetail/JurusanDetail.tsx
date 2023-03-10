import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/UI/atoms/Helmet';
import OverviewCard from '@/components/UI/organism/OverviewCard';
import TableCardProgress from '@/components/UI/molecules/TableCardProgress';
import useIndicatorByMajorQuery from '@/repository/query/IndicatorByMajorQuery';

import HeadSection from './HeadSection';
import ChartSection from './ChartSection';

const JurusanDetail: FC = () => {
  const params = useParams();

  const id = params.id || '';

  const { data: major, isLoading: isMajorLoading } =
    useIndicatorByMajorQuery(id);

  return (
    <>
      <Helmet title={`${major.majorName} | SI-MIKU`} />
      <Container maxWidth="xl">
        <HeadSection id={id} majorData={major} />
        <OverviewCard
          fulfilled={major.totalFulfilled}
          failed={major.totalFailed}
          isLoading={isMajorLoading}
        />
        <ChartSection majorData={major} isLoading={isMajorLoading} />
        <TableCardProgress data={major.indicatorList} isLoading={isMajorLoading} />
      </Container>
    </>
  );
};

export default JurusanDetail;
