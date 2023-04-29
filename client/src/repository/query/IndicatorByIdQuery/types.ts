export interface Count {
  fulfilled: number;
  failed: number;
}

export interface TargetQuarter {
  year_id: number;
  year_value: number;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_quarter_id: number;
  is_target_fulfilled: boolean;
}

// faculty //

export interface FacultyIndicators {
  count: Count;
  data: TargetQuarter[];
}

// major //
export interface MajorIndicatorData {
  count: Count;
  data: MajorIndicator[];
}

export interface MajorIndicator {
  major_id: number;
  major_name: string;
  major_image: string;
  department_id: number;
  major_data: TargetQuarter[];
}

// - - - - //

export interface IndicatorByIdData {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  // is_faculty_indicator: boolean;
  // major_indicators: MajorIndicatorData;
  // faculty_indicators: FacultyIndicators;
}

export interface IndicatorByIdResponse {
  data: IndicatorByIdData;
}

// ------ NORMALIZED TYPES ------ //
export interface TargetQuarterNormalized {
  yearID: number;
  yearValue: number;
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetQuarterID: number;
  isTargetFulfilled: boolean;
}

// Normalized Faculty //
export interface FacultyIndicatorsNormalized {
  count: Count;
  data: TargetQuarterNormalized[];
}

// Normalized Major //
export interface MajorIndicatorDataNormalized {
  count: Count;
  data: MajorIndicatorNormalized[];
}

export interface MajorIndicatorNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  departmentID: number;
  majorData: TargetQuarterNormalized[];
}

// - - - - //
export interface IndicatorByIdDataNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  // isFacultyIndicator: boolean;
  // majorIndicators: MajorIndicatorDataNormalized;
  // facultyIndicators: FacultyIndicatorsNormalized;
}
