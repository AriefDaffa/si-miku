import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { MajorOverviewNormalized, MajorOverviewResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: MajorOverviewResponse) => {
  const result: MajorOverviewNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((data) => {
      if (!data) {
        return result;
      }
      result.push({
        majorId: data.major_id || 0,
        majorName: data.major_name || '',
        totalFailed: data.total_failed || 0,
        totalFulfilled: data.total_fulfilled || 0,
        indicatorMajors:
          data.indicator_majors.map((item) => {
            return {
              failed: item.failed,
              fulfilled: item.fulfilled,
            };
          }) || [],
      });
      return result;
    });
  }

  return result;
};

const useMajorOverviewQuery = () => {
  const { data, ...rest } = useQuery<MajorOverviewResponse>(
    'major-overview',
    () => baseAPI.get(`indicator/overview/major`),
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

export default useMajorOverviewQuery;
