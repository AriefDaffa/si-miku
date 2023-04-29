import { Navigate, useParams } from 'react-router-dom';
import { Fragment, useState, useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import TargetQuarterCard from '@/components/UI/organism/TargetQuarterCard';
import useIndicatorByIdQuery from '@/repository/query/indicator/IndicatorByIdQuery';

import IndicatorDetailContainer from './components/IndicatorDetailContainer';
import ViewSwitcher from './components/ViewSwitcher';
import { getNormalizedFaculty } from './usecase/get-normalized-faculty';
import { getNormalizedMajor } from './usecase/get-normalized-major';
import { getNormalizedDepartment } from './usecase/get-normalized-department';

const IndicatorDetail: FC = () => {
  const params = useParams();

  const [selectedYear, setSelectedYear] = useState('2017');

  const id = params.id || '';

  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);

  if (!isIndicatorLoading && indicator.indicatorCode === '') {
    return <Navigate to="/not-found" />;
  }

  const facultyData = getNormalizedFaculty(
    indicator.indicatorFaculties,
    selectedYear
  );
  const departmentData = getNormalizedDepartment(
    indicator.indicatorDepartments,
    selectedYear
  );
  const majorData = getNormalizedMajor(indicator.indicatorMajors, selectedYear);

  const indicatorName = useMemo(
    () => `${indicator.indicatorCode} - ${indicator.indicatorName}`,
    [indicator]
  );

  return (
    <Fragment>
      {isIndicatorLoading ? (
        <div>Loading...</div>
      ) : (
        <IndicatorDetailContainer
          indicatorName={indicatorName}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        >
          <TargetQuarterCard {...facultyData} />
          <Box>
            <ViewSwitcher
              majorData={majorData}
              facultyData={facultyData}
              departmentData={departmentData}
              indicatorID={indicator.indicatorID}
              indicatorName={indicatorName}
              indicatorType={indicator.indicatorType}
            />
          </Box>
        </IndicatorDetailContainer>
      )}
    </Fragment>
  );
};

export default IndicatorDetail;
