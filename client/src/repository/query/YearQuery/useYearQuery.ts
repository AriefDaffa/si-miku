import { useMemo } from 'react';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { YearResponse, YearData } from './types';

// normalize the data to prevent undefined value
const normalizer = (isLoading: boolean, Deps?: YearResponse) => {
  const result: YearData[] = [];

  if (!isLoading && Deps) {
    Deps.data.map<YearData[]>((item) => {
      if (!item || !item.year_id) {
        return result;
      }

      result.push({ year_id: item.year_id });
      return result;
    });
  }

  return result;
};

const useYearQuery = () => {
  const { data, isLoading, ...rest } = useQuery<YearResponse>(
    'year',
    () => baseAPI.get(`year`),
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

export default useYearQuery;
