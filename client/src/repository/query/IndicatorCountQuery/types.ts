interface YearCount {
  year_value: number;
  is_target_fulfilled: boolean[];
  count: number;
}

export interface IndicatorCountData {
  is_target_fulfilled: boolean;
  years: YearCount[];
  totalCount: number;
}

export interface IndicatorCountResponse {
  data: IndicatorCountData[];
}

// -- NORMALIZED TYPES -- //

export interface YearCountNormalized {
  yearValue: number;
  isTargetFulfilled: boolean[];
  count: number;
}

export interface IndicatorCountNormalized {
  isTargetFulfilled: boolean;
  years: YearCountNormalized[];
  totalCount: number;
}
