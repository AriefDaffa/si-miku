import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

export const defaultSelected: IndicatorMajorsNormalized = {
  indicatorMajorID: 0,
  major: {
    departmentID: 0,
    majorID: 0,
    majorImage: '',
    majorName: '',
  },
  targetMajors: [
    {
      indicatorMajorID: 0,
      targetQuarter: {
        isTargetFulfilled: false,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        targetQuarterID: 0,
        targetValue: 0,
        year: { yearID: 0, yearValue: 0 },
      },
    },
  ],
};
