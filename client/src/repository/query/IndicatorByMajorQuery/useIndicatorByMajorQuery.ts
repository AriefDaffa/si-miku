import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  IndicatorByMajorNormalized,
  IndicatorByMajorResponse,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByMajorResponse) => {
  const result: IndicatorByMajorNormalized = {
    majorId: 0,
    majorName: '',
    totalVal: {
      failed: 0,
      fulfilled: 0,
    },
    indicatorMajors: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.majorId = Deps.data.major_id || 0;
    result.majorName = Deps.data.major_name || '';
    Deps.data.indicator_majors.map((item) => {
      result.indicatorMajors.push({
        indicatorId: item.indicator_id || 0,
        indicatorCode: item.indicator_code || '',
        indicatorName: item.indicator_name || '',
        total: item.year_data.reduce(
          (acc, cur) => {
            if (cur.is_target_fulfilled === true) {
              acc.fulfilled += 1;
              result.totalVal.fulfilled += 1;
            }

            if (cur.is_target_fulfilled === false) {
              acc.failed += 1;
              result.totalVal.failed += 1;
            }

            return acc;
          },
          { failed: 0, fulfilled: 0 }
        ),
        yearData: item.year_data.map((year) => {
          return {
            isTargetFulfilled: year.is_target_fulfilled,
            q1: year.q1,
            q2: year.q2,
            q3: year.q3,
            q4: year.q4,
            target: year.target,
            yearId: year.year_id,
            yearValue: year.year_value,
          };
        }),
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
