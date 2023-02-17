interface TargetQuarter {
  is_target_fulfilled: boolean;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

interface IndicatorMajorYear {
  indicator_major_year_id: number;
  target_quarter: TargetQuarter;
}

interface IndicatorMajorCount {
  indicator_major_id: number;
  indicator_major_years: IndicatorMajorYear[];
}

export interface MajorOverviewData {
  major_id: number;
  major_name: string;
  indicator_majors: IndicatorMajorCount[];
}

export interface MajorOverviewResponse {
  data: MajorOverviewData[];
}

// -- NORMALIZED TYPES -- //

interface TotalNormalized {
  fulfilled: number;
  failed: number;
}

export interface IndicatorMajorNormalized {
  fulfilled: number;
  failed: number;
}

export interface MajorOverviewNormalized {
  majorId: number;
  majorName: string;
  total: TotalNormalized;
  indicatorMajors: IndicatorMajorNormalized[];
}
