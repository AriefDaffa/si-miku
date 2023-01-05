import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorCountResponse, IndicatorCountData } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorCountResponse) => {
  const result: IndicatorCountData = {
    total: 0,
    success: 0,
    failed: 0,
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.total = Deps.data.total || 0;
    result.failed = Deps.data.failed || 0;
    result.success = Deps.data.success || 0;
  }

  return result;
};

const useIndicatorCountQuery = () => {
  const { data, ...rest } = useQuery<IndicatorCountResponse>(
    'indicatorCount',
    () => baseAPI.get(`indicator/count`),
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
