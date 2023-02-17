import type { MajorsNormalized } from '@/repository/query/IndicatorByIdQuery/types';

export interface DialogStateTypes {
  state: boolean;
  major: MajorsNormalized;
}
