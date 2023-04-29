import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorOverviewNormalized,
  IndicatorOverviewResponse,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorOverviewResponse) => {
  const result: IndicatorOverviewNormalized = {
    totalFailed: 0,
    totalFulfilled: 0,
    indicatorYear: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.totalFulfilled = Deps.data.total_fulfilled;
    result.totalFailed = Deps.data.total_failed;
    Deps.data.indicator_year.map((item) => {
      result.indicatorYear.push({
        failed: item.failed,
        fulfilled: item.fulfilled,
        yearId: item.year_id,
        yearValue: item.year_value,
      });
    });
  }

  return result;
};

const useOverviewIndicatorQuery = () => {
  const { data, ...rest } = useQuery<IndicatorOverviewResponse>(
    'overview-indicator',
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

export default useOverviewIndicatorQuery;
