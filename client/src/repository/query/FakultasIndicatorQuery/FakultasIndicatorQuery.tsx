import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { FakultasResponse, FakultasDataNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: FakultasResponse) => {
  const result: FakultasDataNormalized = {
    totalData: 0,
    totalFailed: 0,
    totalFulfilled: 0,
    indicatorList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.totalData = Deps.data.total_data;
    result.totalFailed = Deps.data.total_failed;
    result.totalFulfilled = Deps.data.total_fulfilled;
    Deps.data.indicator_list.map((item) => {
      result.indicatorList.push({
        indicatorID: item.indicator_id,
        indicatorCode: item.indicator_code,
        indicatorName: item.indicator_name,
        isFacultyIndicator: item.is_faculty_indicator,
        count: item.count,
      });
    });
  }

  return result;
};

const useFakultasIndicatorQuery = (enabled?: boolean) => {
  const { data, ...rest } = useQuery<FakultasResponse>(
    'indicator',
    () => baseAPI.get(`fakultas`),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useFakultasIndicatorQuery;
