import type { IndicatorDefaultVal } from './types';

export const defaultVal: IndicatorDefaultVal = {
  fulfilledCount: 0,
  failedCount: 0,
  fulfilledVal: {
    isTargetFulfilled: false,
    totalCount: 0,
    years: [
      {
        count: 0,
        isTargetFulfilled: [],
        yearValue: 0,
      },
    ],
  },
  failedVal: {
    isTargetFulfilled: false,
    totalCount: 0,
    years: [
      {
        count: 0,
        isTargetFulfilled: [],
        yearValue: 0,
      },
    ],
  },
};
