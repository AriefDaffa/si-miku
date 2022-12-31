import { useMemo } from 'react';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorCountResponse, IndicatorCountData } from './types';

// normalize the data to prevent undefined value
const normalizer = (isLoading: boolean, Deps?: IndicatorCountResponse) => {
  const result: IndicatorCountData = {
    total: 0,
    success: 0,
    failed: 0,
  };

  if (!isLoading && Deps) {
    result.total = Deps.data.total;
    result.failed = Deps.data.failed;
    result.success = Deps.data.success;
  }

  return result;
};

const useIndicatorCount = () => {
  const { data, isLoading, ...rest } = useQuery<IndicatorCountResponse>(
    'indicatorCount',
    () => baseAPI.get(`indicator/count`),
    {
      refetchOnWindowFocus: false,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(isLoading, data), isLoading, ...rest };
  }, [data, isLoading, rest]);
};

export default useIndicatorCount;
