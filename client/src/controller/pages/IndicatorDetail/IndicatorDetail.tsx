import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import TargetQuarterCard from '@/presentation/page-component/common/TargetQuarterCard';
import useIndicatorByIdQuery from '@/repository/query/indicator/IndicatorByIdQuery';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { defaultTargetQuarter } from '@/controller/constant/default-target-quarter';

import ViewSwitcher from './ViewSwitcher';
import { useNormalizedFaculty } from './usecase/use-normalized-faculty';
import { useNormalizedMajor } from './usecase/use-normalized-major';
import { useNormalizedDepartment } from './usecase/use-normalized-department';

const IndicatorDetail: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { currentYear } = useCurrentYear();
  const { setHeadline } = useHeadline();

  const id = params.id || '';

  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);

  const facultyData = useNormalizedFaculty(
    indicator.indicatorFaculties,
    currentYear
  );
  const departmentData = useNormalizedDepartment(
    indicator.indicatorDepartments,
    currentYear
  );
  const majorData = useNormalizedMajor(indicator.indicatorMajors, currentYear);

  const indicatorName = useMemo(
    () => `${indicator.indicatorCode} - ${indicator.indicatorName}`,
    [indicator]
  );

  const facultyTargetQuarter = useMemo(() => {
    const data = facultyData.data[0]?.targetFaculties[0]?.targetQuarter;

    if (!data) {
      return defaultTargetQuarter;
    } else {
      return data;
    }
  }, [facultyData]);

  useEffect(() => {
    if (!isIndicatorLoading && indicator.indicatorCode === '') {
      navigate('/not-found');
    }

    setHeadline({
      title: indicatorName,
      subTitle: `Menampilkan data indikator pada tahun ${currentYear}`,
      isYearPickerEnabled: true,
    });
  }, [indicatorName, currentYear]);

  return (
    <Fragment>
      {isIndicatorLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <TargetQuarterCard targetQuarter={facultyTargetQuarter} />
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
