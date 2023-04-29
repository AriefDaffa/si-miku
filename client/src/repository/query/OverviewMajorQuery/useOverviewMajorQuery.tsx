import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { OverviewMajorResponse, OverviewMajorNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: OverviewMajorResponse) => {
  const result: OverviewMajorNormalized = {
    totalFailed: 0,
    totalFulfilled: 0,
    majorList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.totalFulfilled = Deps.data.total_fulfilled;
    result.totalFailed = Deps.data.total_failed;
    Deps.data.major_list.map((item) => {
      result.majorList.push({
        majorName: item.major_name,
        majorImage: item.major_image,
        majorID: item.major_id,
        count: item.count,
      });
    });
  }

  return result;
};

const useOverviewMajorQuery = () => {
  const { data, ...rest } = useQuery<OverviewMajorResponse>(
    'major-overview',
    () => baseAPI.get(`major/overview`),
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

export default useOverviewMajorQuery;
