import { Navigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import TargetQuarterCard from '@/components/UI/organism/TargetQuarterCard';
import useIndicatorByIdQuery from '@/repository/query/indicator/IndicatorByIdQuery';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';

import ViewSwitcher from './ViewSwitcher';
import { getNormalizedFaculty } from './usecase/get-normalized-faculty';
import { getNormalizedMajor } from './usecase/get-normalized-major';
import { getNormalizedDepartment } from './usecase/get-normalized-department';

const IndicatorDetail: FC = () => {
  const params = useParams();

  const { currentYear } = useCurrentYear();
  const { setHeadline } = useHeadline();

  const id = params.id || '';

  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);

  if (!isIndicatorLoading && indicator.indicatorCode === '') {
    return <Navigate to="/not-found" />;
  }

  const facultyData = getNormalizedFaculty(
    indicator.indicatorFaculties,
    currentYear
  );
  const departmentData = getNormalizedDepartment(
    indicator.indicatorDepartments,
    currentYear
  );
  const majorData = getNormalizedMajor(indicator.indicatorMajors, currentYear);

  const indicatorName = useMemo(
    () => `${indicator.indicatorCode} - ${indicator.indicatorName}`,
    [indicator]
  );

  useEffect(() => {
    setHeadline({
      title: indicatorName,
      subTitle: `Menampilkan data indikator pada tahun ${currentYear}`,
    });
  }, [indicatorName, currentYear]);

  return (
    <Fragment>
      {isIndicatorLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </Fragment>
  );
};

export default IndicatorDetail;
