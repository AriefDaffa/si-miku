import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorByIdResponse, IndicatorByIdNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByIdResponse) => {
  const result: IndicatorByIdNormalized = {
    indicatorId: 0,
    indicatorCode: '',
    indicatorName: '',
    indicatorMajors: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.indicatorId = Deps.data.indicator_id || 0;
    result.indicatorCode = Deps.data.indicator_code || '';
    result.indicatorName = Deps.data.indicator_name || '';
    Deps.data.indicator_majors.map((item) => {
      result.indicatorMajors.push({
        major: {
          majorId: item.major.major_id || 0,
          majorName: item.major.major_name || '',
        },
        indicatorData: item.indicator_data.map((data) => {
          return {
            indicatorMajorYearId: data.indicator_major_year_id,
            q1: data.q1,
            q2: data.q2,
            q3: data.q3,
            q4: data.q4,
            target: data.target,
            isTargetFulfilled: data.is_target_fulfilled,
            year: {
              yearId: data.year.year_id || 0,
              yearValue: data.year.year_value || 0,
            },
          };
        }),
      });
    });
  }
  return result;
};

const useIndicatorByIdQuery = (id: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorByIdResponse>(
    ['indicator', id],
    () => baseAPI.get(`indicator/${id}`),
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

export default useIndicatorByIdQuery;
