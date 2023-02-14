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
    result.indicatorId = Deps.data.indicator_id;
    result.indicatorCode = Deps.data.indicator_code;
    result.indicatorName = Deps.data.indicator_name;
    Deps.data.indicator_majors.map((item) => {
      result.indicatorMajors.push({
        major: {
          majorId: item.major.major_id,
          majorName: item.major.major_name,
        },
        indicatorData: item.indicator_data.map((data) => {
          const total = data.q1 + data.q2 + data.q3 + data.q4;
          return {
            q1: data.q1,
            q2: data.q2,
            q3: data.q3,
            q4: data.q4,
            target: data.target,
            isTargetFulfilled: total === 0 ? false : total >= data.target,
            year: {
              yearId: data.year.year_id,
              yearValue: data.year.year_value,
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
