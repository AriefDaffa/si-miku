import { Navigate, useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/Helmet';
import useYearQuery from '@/repository/query/YearQuery';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery';

import HeadSection from './HeadSection';
import ChartSection from './ChartSection';
import JurusanSection from './JurusanSection';

const IndicatorDetail: FC = () => {
  const params = useParams();

  const id = params.id || '';

  const { data: year, isLoading: isYearLoading } = useYearQuery();
  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);

  if (!isIndicatorLoading && indicator.indicatorCode === '') {
    return <Navigate to="/not-found" />;
  }

  return (
    <>
      <Helmet title={`${indicator.indicatorName} | SI-MIKU`} />
      <Container maxWidth="xl">
        <HeadSection
          indicatorName={`${indicator.indicatorCode} ${indicator.indicatorName}`}
        />
        <ChartSection
          indicatorData={indicator}
          yearData={year}
          isIndicatorLoading={isIndicatorLoading}
          isYearLoading={isYearLoading}
        />
        <JurusanSection
          indicatorData={indicator}
          isIndicatorLoading={isIndicatorLoading}
        />
      </Container>
    </>
  );
};

export default IndicatorDetail;
