interface Count {
  fulfilled: number;
  failed: number;
}

interface YearProgress {
  year_id: number;
  year_value: number;
  count: Count;
}

export interface IndicatorOverviewResponse {
  data: YearProgress;
}

// -- NORMALIZED TYPES -- //
interface CountNormalized {
  fulfilled: number;
  failed: number;
}

export interface YearProgressNormalized {
  yearID: number;
  yearValue: number;
  count: CountNormalized;
}
