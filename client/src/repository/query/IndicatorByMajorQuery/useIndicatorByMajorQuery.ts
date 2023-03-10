import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  IndicatorByMajorResponse,
  IndicatorByMajorNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByMajorResponse) => {
  const result: IndicatorByMajorNormalized = {
    majorID: 0,
    majorImage: '',
    majorName: '',
    totalFailed: 0,
    totalFulfilled: 0,
    indicatorList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.majorID = Deps.data.major_id;
    result.majorImage =
      import.meta.env.VITE_BASE_API_URL + Deps.data.major_image;
    result.majorName = Deps.data.major_name;
    result.totalFulfilled = Deps.data.total_fulfilled;
    result.totalFailed = Deps.data.total_failed;
    Deps.data.indicator_list.map((item) => {
      result.indicatorList.push({
        indicatorID: item.indicator_id,
        indicatorName: item.indicator_name,
        indicatorCode: item.indicator_code,
        isFacultyIndicator: item.is_faculty_indicator,
        count: item.count,
      });
    });
  }

  return result;
};

const useIndicatorByMajorQuery = (major: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorByMajorResponse>(
    ['indicatorPerMajor', major],
    () => baseAPI.get(`indicator/major/${major}`),
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

export default useIndicatorByMajorQuery;
