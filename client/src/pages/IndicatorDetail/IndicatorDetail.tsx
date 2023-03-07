import { Navigate, useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/UI/Helmet';
import useYearQuery from '@/repository/query/YearQuery';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery';

import HeadSection from './HeadSection';
import ChartSection from './ChartSection';
import JurusanSection from './JurusanSection';
import OverviewSection from './OverviewSection';
import TableSection from './TableSection';

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
        <ChartSection
          indicatorData={indicator.facultyIndicators.data}
          isIndicatorLoading={isIndicatorLoading}
        />
        <TableSection
          data={indicator.facultyIndicators.data}
          isLoading={isIndicatorLoading}
          indicatorID={indicator.indicatorID}
          indicatorCode={indicator.indicatorCode}
          indicatorName={indicator.indicatorName}
        />
        {/* <JurusanSection
          indicatorData={indicator}
          isIndicatorLoading={isIndicatorLoading}
        /> */}
      </Container>
    </>
  );
};

export default IndicatorDetail;
