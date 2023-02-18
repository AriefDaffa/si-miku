export interface IndicatorByMajorTargetQuarters {
  year_id: number;
  year_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  is_target_fulfilled: boolean;
}

export interface IndicatorByMajorArray {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  year_data: IndicatorByMajorTargetQuarters[];
}

export interface IndicatorByMajorData {
  major_id: number;
  major_name: string;
  indicator_majors: IndicatorByMajorArray[];
}

export interface IndicatorByMajorResponse {
  data: IndicatorByMajorData;
}

// -- NORMALIZED TYPES -- //

interface TotalNormalized {
  fulfilled: number;
  failed: number;
}

export interface IndicatorByMajorTargetQuartersNormalized {
  yearId: number;
  yearValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  isTargetFulfilled: boolean;
}

export interface IndicatorByMajorNormalizedData {
  indicatorId: number;
  indicatorCode: string;
  indicatorName: string;
  total: TotalNormalized;
  yearData: IndicatorByMajorTargetQuartersNormalized[];
}

export interface IndicatorByMajorNormalized {
  majorId: number;
  majorName: string;
  totalVal: TotalNormalized;
  indicatorMajors: IndicatorByMajorNormalizedData[];
}
