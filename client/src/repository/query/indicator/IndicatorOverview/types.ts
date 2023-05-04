interface Count {
  fulfilled: number;
  failed: number;
}

interface YearProgress {
  year_id: number;
  year_value: number;
  count: Count;
}

export interface IndicatorOverviewData {
  indicator_total: number;
  indicator_department: number;
  indicator_major: number;
  year_progress: YearProgress[];
}

export interface IndicatorOverviewResponse {
  data: IndicatorOverviewData;
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

export interface IndicatorOverviewDataNormalized {
  indicatorTotal: number;
  indicatorDepartment: number;
  indicatorMajor: number;
  yearProgress: YearProgressNormalized[];
}
