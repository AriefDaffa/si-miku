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
        indicatorDepartmentID: item.indicator_department_id,
        year: {
          yearID: item.year.year_id,
          yearValue: item.year.year_value,
        },
      });
    });
  }
  return result;
};

const useDepartmentYearQuery = () => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    'department-year',
    () => baseAPI.get('years/department'),
    {
      refetchOnWindowFocus: false,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useDepartmentYearQuery;
