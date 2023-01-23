import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { TargetQuarterNormalized, TargetQuarterResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: TargetQuarterResponse) => {
  const result: TargetQuarterNormalized = {
    failedTarget: [],
    successTarget: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.success_target.map((item) => {
      if (!item || !item.year_id || !item.year_value) {
        return result;
      }

      result.successTarget.push({
        yearId: item.year_id || 0,
        yearValue: item.year_value || 0,
        total: item.total || 0,
      });
    });
    Deps.data.failed_target.map((item) => {
      if (!item || !item.year_id || !item.year_value) {
        return result;
      }

      result.failedTarget.push({
        yearId: item.year_id || 0,
        yearValue: item.year_value || 0,
        total: item.total || 0,
      });
    });
  }

  return result;
};

const useTargetQuarterQuery = () => {
  const { data, ...rest } = useQuery<TargetQuarterResponse>(
    'targetQuarter',
    () => baseAPI.get('indicator/target-quarter'),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useTargetQuarterQuery;
