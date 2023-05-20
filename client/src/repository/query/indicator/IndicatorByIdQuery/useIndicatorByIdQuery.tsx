import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorByIdResponse,
  IndicatorByIdDataNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByIdResponse) => {
  const result: IndicatorByIdDataNormalized = {
    indicatorID: 0,
    indicatorCode: '',
    indicatorName: '',
    indicatorType: 0,
    indicatorDepartments: [],
    indicatorFaculties: [],
    indicatorMajors: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.indicatorID = Deps.data.indicator_id;
    result.indicatorCode = Deps.data.indicator_code;
    result.indicatorName = Deps.data.indicator_name;
    result.indicatorType = Deps.data.indicator_type;

    Deps.data.indicator_departments.map((item) => {
      result.indicatorDepartments.push({
        indicatorDepartmentID: item.indicator_department_id,
        department: {
          departmentID: item.department.department_id,
          departmentName: item.department.department_name,
          departmentImage:
            item.department.department_image !== '' ||
            item.department.department_image !== null
              ? import.meta.env.VITE_BASE_API_URL +
                item.department.department_image
              : '',
        },
        targetDeps: item.target_deps.map((data) => {
          return {
            targetDepID: data.target_dep_id,
            targetQuarter: {
              q1: data.target_quarter.q1,
              q2: data.target_quarter.q2,
              q3: data.target_quarter.q3,
              q4: data.target_quarter.q4,
              isTargetFulfilled: data.target_quarter.is_target_fulfilled,
              targetQuarterID: data.target_quarter.target_quarter_id,
              targetValue: data.target_quarter.target_value,
              year: {
                yearID: data.target_quarter.year.year_id,
                yearValue: data.target_quarter.year.year_value,
              },
            },
          };
        }),
      });
    });

    Deps.data.indicator_faculties.map((item) => {
      result.indicatorFaculties.push({
        indicatorFacultyID: item.indicator_faculty_id,
        faculty: {
          facultyID: item.faculty.faculty_id,
          facultyName: item.faculty.faculty_name,
        },
        targetFaculties: item.target_faculties.map((data) => {
          return {
            indicatorFacultyID: data.indicator_faculty_id,
            targetQuarter: {
              q1: data.target_quarter.q1,
              q2: data.target_quarter.q2,
              q3: data.target_quarter.q3,
              q4: data.target_quarter.q4,
              isTargetFulfilled: data.target_quarter.is_target_fulfilled,
              targetQuarterID: data.target_quarter.target_quarter_id,
              targetValue: data.target_quarter.target_value,
              year: {
                yearID: data.target_quarter.year.year_id,
                yearValue: data.target_quarter.year.year_value,
              },
            },
          };
        }),
      });
    });

    Deps.data.indicator_majors.map((item) => {
      result.indicatorMajors.push({
        indicatorMajorID: item.indicator_major_id,
        major: {
          majorID: item.major.major_id,
          majorName: item.major.major_name,
          majorImage:
            item.major.major_image !== '' || item.major.major_image !== null
              ? import.meta.env.VITE_BASE_API_URL + item.major.major_image
              : '',
          departmentID: item.major.department_id,
        },
        targetMajors: item.target_majors.map((data) => {
          return {
            indicatorMajorID: data.indicator_major_id,
            targetQuarter: {
              q1: data.target_quarter.q1,
              q2: data.target_quarter.q2,
              q3: data.target_quarter.q3,
              q4: data.target_quarter.q4,
              isTargetFulfilled: data.target_quarter.is_target_fulfilled,
              targetQuarterID: data.target_quarter.target_quarter_id,
              targetValue: data.target_quarter.target_value,
              year: {
                yearID: data.target_quarter.year.year_id,
                yearValue: data.target_quarter.year.year_value,
              },
            },
          };
        }),
      });
    });
  }

  return result;
};

const useIndicatorByIdQuery = (id: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorByIdResponse>(
    ['indicator', id],
    () => baseAPI.get(`indicator/${id}`),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useIndicatorByIdQuery;
