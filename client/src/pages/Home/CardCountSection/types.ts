import { IndicatorCountNormalized } from '@/repository/query/IndicatorCountQuery/types';

export interface IndicatorDefaultVal {
  fulfilledCount: number;
  failedCount: number;
  fulfilledVal: IndicatorCountNormalized;
  failedVal: IndicatorCountNormalized;
}
