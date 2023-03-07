interface IndicatorYear {
  year_id: number;
  year_value: number;
  failed: number;
  fulfilled: number;
}

export interface IndicatorOverviewData {
  total_fulfilled: number;
  total_failed: number;
  indicator_year: IndicatorYear[];
}

export interface IndicatorOverviewResponse {
  data: IndicatorOverviewData;
}

// -- NORMALIZED TYPES -- //

export interface IndicatorYearNormalized {
  yearId: number;
  yearValue: number;
  failed: number;
  fulfilled: number;
}

export interface IndicatorOverviewNormalized {
  totalFulfilled: number;
  totalFailed: number;
  indicatorYear: IndicatorYearNormalized[];
}
