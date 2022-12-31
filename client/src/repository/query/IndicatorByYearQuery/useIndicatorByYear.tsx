import { useMemo } from 'react';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  IndicatorByYearResponse,
  IndicatorByYearNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (isLoading: boolean, Deps?: IndicatorByYearResponse) => {
  const result: IndicatorByYearNormalized = {
    yearId: 0,
    indicator: [],
  };

  if (!isLoading && Deps) {
    result.yearId = Deps.data.year_id;
    Deps.data.indicators.map((item) => {
      if (!item) {
        return result;
      }

      result.indicator.push({
        indicatorId: item.indicator_id,
        indicatorName: item.indicator_name,
        quarterOne: item.target_quarters.q1,
        quarterTwo: item.target_quarters.q2,
        quarterThree: item.target_quarters.q3,
        quarterFour: item.target_quarters.q4,
        target: item.target_quarters.target,
      });

      return result;
    });
  }

  return result;
};

const useIndicatorByYear = (year: string, enabled?: boolean) => {
  const { data, isLoading, ...rest } = useQuery<IndicatorByYearResponse>(
    ['indicatorPerYear', year],
    () => baseAPI.get(`indicator/year/${year}`),
    {
      refetchOnWindowFocus: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(isLoading, data), isLoading, ...rest };
  }, [data, isLoading, rest]);
};

export default useIndicatorByYear;
