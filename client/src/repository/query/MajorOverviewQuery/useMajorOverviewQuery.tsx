import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { MajorOverviewNormalized, MajorOverviewResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: MajorOverviewResponse) => {
  const result: MajorOverviewNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item, idx) => {
      result.push({
        majorId: item.major_id || 0,
        majorName: item.major_name || '',
        majorImage: import.meta.env.VITE_BASE_API_URL + item.major_image || '',
        total: { failed: 0, fulfilled: 0 },
        indicatorMajors: item.indicator_majors.map((data) => {
          return data.indicator_major_years.reduce(
            (acc, cur) => {
              const { is_target_fulfilled } = cur.target_quarter;

              if (is_target_fulfilled === true) {
                acc.fulfilled += 1;
              } else if (is_target_fulfilled === false) {
                acc.failed += 1;
              }

              return acc;
            },
            { fulfilled: 0, failed: 0 }
          );
        }),
      });
      result[idx].total = result[idx].indicatorMajors.reduce(
        (acc, cur) => {
          if (cur.fulfilled) {
            acc.fulfilled += cur.fulfilled;
          }

          if (cur.failed) {
            acc.failed += cur.failed;
          }

          return acc;
        },
        { failed: 0, fulfilled: 0 }
      );
    });

    return result;
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
