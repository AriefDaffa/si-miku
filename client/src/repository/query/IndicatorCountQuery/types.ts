interface TargetQuarter {
  is_target_fulfilled: boolean;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

interface IndicatorMajorYears {
  indicator_major_year_id: number;
  target_quarter: TargetQuarter;
}

export interface IndicatorCountData {
  year_id: number;
  year_value: number;
  indicator_major_years: IndicatorMajorYears[];
}

export interface IndicatorCountResponse {
  data: IndicatorCountData[];
}

// -- NORMALIZED TYPES -- //

interface TargetNormalized {
  fulfilled: number;
  failed: number;
}

interface TotalNormalized {
  fulfilled: number;
  failed: number;
}

export interface YearCountNormalized {
  yearValue: number;
  target: TargetNormalized;
}

export interface IndicatorCountNormalized {
  years: YearCountNormalized[];
  total: TotalNormalized;
}
