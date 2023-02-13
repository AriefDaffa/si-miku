import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorResponse, IndicatorResponseNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorResponse) => {
  const result: IndicatorResponseNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      if (!item || !item.indicator_id || !item.indicator_name) {
        return result;
      }

      result.push({
        indicatorID: item.indicator_id || 0,
        indicatorName: item.indicator_name || '',
        indicatorCode: item.indicator_code || '',
        // years: item.years.map((data) => ({
        //   yearId: data.year_id || 0,
        //   targetQuarters: {
        //     target: data.target_quarters.target || 0,
        //     quarterOne: data.target_quarters.q1 || 0,
        //     quarterTwo: data.target_quarters.q2 || 0,
        //     quarterThree: data.target_quarters.q3 || 0,
        //     quarterFour: data.target_quarters.q4 || 0,
        //   },
        // })),
      });

      return result;
    });
  }
  return result;
};

const useIndicatorQuery = () => {
  const { data, ...rest } = useQuery<IndicatorResponse>(
    'indicator',
    () => baseAPI.get('indicator'),
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

export default useIndicatorQuery;
