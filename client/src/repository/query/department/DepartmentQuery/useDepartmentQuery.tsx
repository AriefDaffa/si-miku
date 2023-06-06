import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { IndicatorListResponse, IndicatorListNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorListNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        departmentID: item.department_id,
        departmentName: item.department_name,
        departmentImage:
          item.department_image === '' || item.department_image === null
            ? ''
            : import.meta.env.VITE_BASE_API_URL + item.department_image,
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
