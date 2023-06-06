import { useMemo } from 'react';

import type { IndicatorFacultiesNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';
import type { GetFacultyNormalizedResult } from '../types';

export const useNormalizedFaculty = (
  data: IndicatorFacultiesNormalized[],
  selectedYear: string
) => {
  return useMemo(
    () =>
      data.reduce<GetFacultyNormalizedResult>(
        (acc, cur) => {
          const { targetFaculties, ...rest } = cur;

          const newTargetFac = targetFaculties.filter(
            (item) => String(item.targetQuarter.year.yearValue) === selectedYear
          );

          newTargetFac.map((item) => {
            if (item.targetQuarter.isTargetFulfilled === true) {
              acc.fulfilled += 1;
            } else if (item.targetQuarter.isTargetFulfilled === false) {
              acc.failed += 1;
            }
          });

          if (newTargetFac.length !== 0) {
            acc.data.push({ ...rest, targetFaculties: newTargetFac });
          } else {
            acc.notSet += 1;
            acc.data.push({
              ...rest,
              targetFaculties: [
                {
                  indicatorFacultyID: 0,
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
