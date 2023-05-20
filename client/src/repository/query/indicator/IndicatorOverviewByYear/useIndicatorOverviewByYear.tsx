import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  YearProgressNormalized,
  IndicatorOverviewResponse,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorOverviewResponse) => {
  const result: YearProgressNormalized = {
    yearID: 0,
    yearValue: 0,
    count: { failed: 0, fulfilled: 0 },
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.yearID = Deps.data.year_id;
    result.yearValue = Deps.data.year_value;
    result.count = Deps.data.count;
  }
  return result;
};

const useIndicatorOverviewByYear = (year_value: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorOverviewResponse>(
    ['indicator-overview-year', year_value],
    () => baseAPI.get('indicator/overview/year', { params: { year_value } }),
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

export default useIndicatorOverviewByYear;
