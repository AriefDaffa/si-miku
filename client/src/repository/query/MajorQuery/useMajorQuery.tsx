import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { MajorOverviewNormalized, MajorOverviewResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: MajorOverviewResponse) => {
  const result: MajorOverviewNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        majorID: item.major_id || 0,
        majorName: item.major_name || '',
        majorImage: import.meta.env.VITE_BASE_API_URL + item.major_image || '',
      });
    });

    return result;
  }

  return result;
};

const useMajorQuery = () => {
  const { data, ...rest } = useQuery<MajorOverviewResponse>(
    'major',
    () => baseAPI.get(`major`),
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

export default useMajorQuery;
