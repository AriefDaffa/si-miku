import { useMemo } from 'react';

import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';
import type { GetMajorNormalizedResult } from '../types';

export const useNormalizedMajor = (
  data: IndicatorMajorsNormalized[],
  selectedYear: string
) => {
  return useMemo(
    () =>
      data.reduce<GetMajorNormalizedResult>(
        (acc, cur) => {
          const { targetMajors, ...rest } = cur;

          const newTargetMaj = targetMajors.filter(
            (item) => String(item.targetQuarter.year.yearValue) === selectedYear
          );

          newTargetMaj.map((item) => {
            if (item.targetQuarter.isTargetFulfilled === true) {
              acc.fulfilled += 1;
            } else if (item.targetQuarter.isTargetFulfilled === false) {
              acc.failed += 1;
            }
          });

          if (newTargetMaj.length !== 0) {
            acc.data.push({ ...rest, targetMajors: newTargetMaj });
          } else {
            acc.notSet += 1;
            acc.data.push({
              ...rest,
              targetMajors: [
                {
                  indicatorMajorID: 0,
                  targetQuarter: {
                    q1: 0,
                    q2: 0,
                    q3: 0,
                    q4: 0,
                    isTargetFulfilled: false,
                    targetValue: 0,
                    year: { yearID: 0, yearValue: Number(selectedYear) },
                    targetQuarterID: 0,
                  },
                },
              ],
            });
          }

          return acc;
        },
        { data: [], fulfilled: 0, failed: 0, notSet: 0 }
      ),
    [data, selectedYear]
  );
};
