import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  IndicatorByIdResponse,
  IndicatorByIdResponseNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByIdResponse) => {
  const result: IndicatorByIdResponseNormalized = {
    indicatorID: 0,
    indicatorName: '',
    years: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    (result.indicatorID = Deps.data.indicator_id || 0),
      (result.indicatorName = Deps.data.indicator_name || ''),
      Deps.data.years.map((item) => {
        if (!item || !item.target_quarters || !item.year_id) {
          return result;
        }

        result.years.push({
          yearId: item.year_id || 0,
          quarterOne: item.target_quarters.q1 || 0,
          quarterTwo: item.target_quarters.q2 || 0,
          quarterThree: item.target_quarters.q3 || 0,
          quarterFour: item.target_quarters.q4 || 0,
          target: item.target_quarters.target || 0,
          status:
            item.target_quarters.q1 +
              item.target_quarters.q2 +
              item.target_quarters.q3 +
              item.target_quarters.q4 >=
            item.target_quarters.target
              ? 'Memenuhi'
              : 'Belum Memenuhi',
        });

        return result;
      });
  }
  return result;
};

const useIndicatorByIdQuery = (id: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorByIdResponse>(
    ['indicator', id],
    () => baseAPI.get(`indicator/${id}`),
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

export default useIndicatorByIdQuery;
