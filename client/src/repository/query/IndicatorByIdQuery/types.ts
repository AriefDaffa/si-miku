export interface Year {
  year_id: number;
  year_value: number;
}

export interface IndicatorData {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  is_target_fulfilled: boolean;
  year: Year;
}
export interface Majors {
  major_id: number;
  major_name: string;
}

export interface IndicatorByIdMajors {
  major: Majors;
  indicator_data: IndicatorData[];
}

export interface IndicatorByIdData {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_majors: IndicatorByIdMajors[];
}

export interface IndicatorByIdResponse {
  data: IndicatorByIdData;
}

// -- NORMALIZED TYPES -- //

export interface YearNormalized {
  yearId: number;
  yearValue: number;
}

export interface IndicatorDataNormalized {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  isTargetFulfilled: boolean;
  year: YearNormalized;
}
export interface MajorsNormalized {
  majorId: number;
  majorName: string;
}

export interface IndicatorByIdMajorsNormalized {
  major: MajorsNormalized;
  indicatorData: IndicatorDataNormalized[];
}

export interface IndicatorByIdNormalized {
  indicatorId: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorMajors: IndicatorByIdMajorsNormalized[];
}
