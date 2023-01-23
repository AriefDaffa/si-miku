import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorCountResponse, IndicatorCountNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorCountResponse) => {
  const result: IndicatorCountNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        isTargetFulfilled: item.is_target_fulfilled || false,
        totalCount: item.totalCount || 0,
        years: item.years.map((year) => {
          return {
            count: year.count || 0,
            isTargetFulfilled: year.is_target_fulfilled.map(
              (target) => target || false
            ),
            yearValue: year.year_value || 0,
          };
        }),
      });
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
