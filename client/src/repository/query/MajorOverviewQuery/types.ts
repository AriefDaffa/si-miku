interface IndicatorMajorCount {
  fulfilled: number;
  failed: number;
}

export interface MajorOverviewData {
  major_id: number;
  major_name: string;
  total_fulfilled: number;
  total_failed: number;
  indicator_majors: IndicatorMajorCount[];
}

export interface MajorOverviewResponse {
  data: MajorOverviewData[];
}

// -- NORMALIZED TYPES -- //

export interface IndicatorMajorNormalized {
  fulfilled: number;
  failed: number;
}

export interface MajorOverviewNormalized {
  majorId: number;
  majorName: string;
  totalFulfilled: number;
  totalFailed: number;
  indicatorMajors: IndicatorMajorNormalized[];
}
