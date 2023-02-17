import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorCountResponse, IndicatorCountNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorCountResponse) => {
  const result: IndicatorCountNormalized = {
    years: [],
    total: {
      failed: 0,
      fulfilled: 0,
    },
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.years.push({
        yearValue: item.year_value,
        target: item.indicator_major_years.reduce(
          (acc, cur) => {
            const { target_quarter } = cur;
            const total =
              target_quarter.q1 +
              target_quarter.q2 +
              target_quarter.q3 +
              target_quarter.q4;

            if (total >= target_quarter.target_value) {
              acc.fulfilled += 1;
            } else {
              acc.failed += 1;
            }

            return acc;
          },
          { failed: 0, fulfilled: 0 }
        ),
      });
    });
    result.total = result.years.reduce(
      (acc, cur) => {
        if (cur.target.fulfilled) {
          acc.fulfilled += 1;
        } else {
          acc.failed += 1;
        }

        return acc;
      },
      { fulfilled: 0, failed: 0 }
    );
  }

  return result;
};

const useIndicatorCountQuery = () => {
  const { data, ...rest } = useQuery<IndicatorCountResponse>(
    'indicatorCount',
    () => baseAPI.get(`indicator/overview`),
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

export default useIndicatorCountQuery;
