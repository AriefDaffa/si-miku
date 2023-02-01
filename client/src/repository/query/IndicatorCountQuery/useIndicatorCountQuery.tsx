import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorCountResponse, IndicatorCountNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorCountResponse) => {
  const result: IndicatorCountNormalized = {
    years: [],
    totalFailed: 0,
    totalFulfilled: 0,
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.totalFulfilled = Deps.data.total_fulfilled;
    result.totalFailed = Deps.data.total_failed;
    Deps.data.years.map((item) => {
      if (!item) {
        return result;
      }

      result.years.push({
        failed: item.failed || 0,
        fulfilled: item.fulfilled || 0,
        yearValue: item.year_value || 0,
      });

      return result;
    });
  }

  return result;
};

const useIndicatorCountQuery = () => {
  const { data, ...rest } = useQuery<IndicatorCountResponse>(
    'indicatorCount',
    () => baseAPI.get(`indicator/overview`),
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

export default useIndicatorCountQuery;
