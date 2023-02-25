import type {
  IndicatorDataNormalized,
  MajorsNormalized,
} from '@/repository/query/IndicatorByIdQuery/types';

export interface DialogStateTypes {
  state: boolean;
  major: MajorsNormalized;
}

export interface DialogFullVal {
  state: boolean;
  indicatorName: string;
  major: MajorsNormalized;
  data: IndicatorDataNormalized;
}
