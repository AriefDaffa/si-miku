import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorListResponse,
  IndicatorListDataNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorListDataNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        departmentID: item.department_id,
        departmentName: item.department_name,
        departmentImage:
          item.department_image === '' || item.department_image === null
            ? ''
            : import.meta.env.VITE_BASE_API_URL + item.department_image,
        // indicatorDepartment: item.indicator_departments.map((data) => {
        //   return {
        //     indicator: {
        //       indicatorID: data.indicator.indicator_id,
        //       indicatorCode: data.indicator.indicator_code,
        //       indicatorName: data.indicator.indicator_name,
        //       indicatorType: data.indicator.indicator_type,
        //       supervisedBy: data.indicator.supervised_by,
        //       createdBy: data.indicator.created_by,
        //     },
        //     targetQuarter: {
        //       q1: data.target_quarter?.q1 || 0,
        //       q2: data.target_quarter?.q2 || 0,
        //       q3: data.target_quarter?.q3 || 0,
        //       q4: data.target_quarter?.q4 || 0,
        //       isTargetFulfilled:
        //         data.target_quarter?.is_target_fulfilled || false,
        //       targetQuarterID: data.target_quarter?.target_quarter_id || 0,
        //       targetValue: data.target_quarter?.target_value || 0,
        //     },
        //     year: {
        //       yearID: data.year?.year_id || 0,
        //       yearValue: data.year?.year_value || 0,
        //     },
        //     indicatorDepartmentID: data.indicator_department_id,
        //   };
        // }),
      });
    });
  }
  return result;
};

const useDepartmentQuery = (enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    'department',
    () => baseAPI.get('department'),
    {
      refetchOnWindowFocus: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useDepartmentQuery;
