import type { TargetQuarterNormalized } from '@/repository/query/IndicatorByIdQuery';

export const defaultSelected: TargetQuarterNormalized = {
  targetQuarterID: 0,
  yearValue: 0,
  yearID: 0,
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0,
  targetValue: 0,
  isTargetFulfilled: false,
};
