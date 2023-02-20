import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/Helmet';
import useYearQuery from '@/repository/query/YearQuery';
import useIndicatorByMajorQuery from '@/repository/query/IndicatorByMajorQuery';

import TableSection from './TableSection';
import HeadSection from './HeadSection';
import ChartSection from './ChartSection';
import ProgressSection from './ProgressSection';

const JurusanDetail: FC = () => {
  const params = useParams();

  const id = params.id || '';

  const { data: year, isLoading: isYearLoading } = useYearQuery();
  const { data: major, isLoading: isMajorLoading } =
    useIndicatorByMajorQuery(id);

  return (
    <>
      <Helmet title={`${major.majorName} | SI-MIKU`} />
      <Container maxWidth="xl">
        <HeadSection id={id} majorData={major} />
        <ProgressSection
          indicatorCount={major.indicatorMajors.length}
          indicatorFailed={major.totalVal.failed}
          indicatorFulfilled={major.totalVal.fulfilled}
        />
        <ChartSection majorData={major} />
        {/* <TableSection
          yearData={year}
          isYearLoading={isYearLoading}
          majorData={major}
          isLoading={isMajorLoading}
        /> */}
      </Container>
    </>
  );
};

export default JurusanDetail;
