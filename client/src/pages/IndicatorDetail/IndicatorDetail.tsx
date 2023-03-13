import { Navigate, useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/UI/atoms/Helmet';
import useYearQuery from '@/repository/query/YearQuery';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery';

import HeadSection from './HeadSection';
import ChartSection from './ChartSection';
import OverviewSection from './OverviewSection';
import FacultySection from './FacultySection';
import MajorSection from './MajorSection';

const IndicatorDetail: FC = () => {
  const params = useParams();

  const id = params.id || '';

  // const { data: year, isLoading: isYearLoading } = useYearQuery();
  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);

  if (!isIndicatorLoading && indicator.indicatorCode === '') {
    return <Navigate to="/not-found" />;
  }

  const isFaculty = indicator.isFacultyIndicator === true;

  return (
    <>
      <Helmet title={`${indicator.indicatorName} | SI-MIKU`} />
      <Container maxWidth="xl">
        <HeadSection
          indicatorName={`${indicator.indicatorCode} ${indicator.indicatorName}`}
        />
        <OverviewSection
          indicatorData={indicator}
          isIndicatorLoading={isIndicatorLoading}
        />
        {isFaculty ? (
          <FacultySection data={indicator} isLoading={isIndicatorLoading} />
        ) : (
          <MajorSection data={indicator} isLoading={isIndicatorLoading} />
        )}
      </Container>
    </>
  );
};

export default IndicatorDetail;
