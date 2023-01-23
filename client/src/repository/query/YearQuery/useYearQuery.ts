import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { YearResponse, YearData, YearDataNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: YearResponse) => {
  const result: YearDataNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      if (!item || !item.year_value) {
        return result;
      }

      result.push({ yearValue: item.year_value || 0 });
      return result;
    });
  }

  return result;
};

const useYearQuery = () => {
  const { data, ...rest } = useQuery<YearResponse>(
    'year',
    () => baseAPI.get(`year`),
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

export default useYearQuery;
