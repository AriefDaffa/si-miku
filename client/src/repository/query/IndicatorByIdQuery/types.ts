export interface Count {
  fulfilled: number;
  failed: number;
}

export interface FacultyIndicators {
  count: Count;
  data: TargetQuarters[];
}

export interface MajorIndicatorData {
  count: Count;
  data: MajorIndicator[];
}

export interface TargetQuarters {
  year_id: number;
  year_value: number;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  is_target_fulfilled: boolean;
}
export interface MajorIndicator {
  major_id: number;
  major_name: string;
  major_image: string;
  major_data: TargetQuarters[];
}

export interface IndicatorByIdData {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  is_faculty_indicator: boolean;
  major_indicators: MajorIndicatorData;
  faculty_indicators: FacultyIndicators;
}

export interface IndicatorByIdResponse {
  data: IndicatorByIdData;
}

// -- NORMALIZED TYPES -- //

export interface FacultyIndicatorsNormalized {
  count: Count;
  data: TargetQuartersNormalized[];
}

export interface MajorIndicatorDataNormalized {
  count: Count;
  data: MajorIndicatorNormalized[];
}

export interface TargetQuartersNormalized {
  yearID: number;
  yearValue: number;
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  isTargetFulfilled: boolean;
}
export interface MajorIndicatorNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  majorData: TargetQuartersNormalized[];
}

export interface IndicatorByIdDataNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  isFacultyIndicator: boolean;
  majorIndicators: MajorIndicatorDataNormalized;
  facultyIndicators: FacultyIndicatorsNormalized;
}
