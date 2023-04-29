import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { UserResponse, YearNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: UserResponse) => {
  const result: YearNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        yearID: item.year_id,
        yearValue: item.year_value,
      });
    });
  }

  return result;
};

const useYearQuery = (disabled?: boolean) => {
  const { data, ...rest } = useQuery<UserResponse>(
    'year',
    () => baseAPI.get(`year`),
    {
      refetchOnWindowFocus: false,
      enabled: !disabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useYearQuery;
