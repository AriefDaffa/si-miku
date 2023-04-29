import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';
import type { GetDepartmentNormalizedResult } from '../types';

export const getNormalizedDepartment = (
  data: IndicatorDepartmentsNormalized[],
  selectedYear: string
) => {
  const filterDepartmentByYear = data.reduce<GetDepartmentNormalizedResult>(
    (acc, cur) => {
      const { targetDeps, ...rest } = cur;

      const newTargetDeps = targetDeps.filter(
        (item) => String(item.targetQuarter.year.yearValue) === selectedYear
      );

      newTargetDeps.map((item) => {
        if (item.targetQuarter.isTargetFulfilled === true) {
          acc.fulfilled += 1;
        } else if (item.targetQuarter.isTargetFulfilled === false) {
          acc.failed += 1;
        }
      });

      if (newTargetDeps.length !== 0) {
        acc.data.push({ ...rest, targetDeps: newTargetDeps });
      } else {
        acc.notSet += 1;
        acc.data.push({
          ...rest,
          targetDeps: [
            {
              targetDepID: 0,
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
  );

  return filterDepartmentByYear;
};
