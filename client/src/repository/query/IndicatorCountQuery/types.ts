interface YearCount {
  year_value: number;
  fulfilled: number;
  failed: number;
}

export interface IndicatorCountData {
  years: YearCount[];
  total_fulfilled: number;
  total_failed: number;
}

export interface IndicatorCountResponse {
  data: IndicatorCountData;
}

// -- NORMALIZED TYPES -- //

export interface YearCountNormalized {
  yearValue: number;
  fulfilled: number;
  failed: number;
}

export interface IndicatorCountNormalized {
  years: YearCountNormalized[];
  totalFulfilled: number;
  totalFailed: number;
}
