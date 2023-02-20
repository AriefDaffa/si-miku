export interface Year {
  year_id: number;
  year_value: number;
}

export interface IndicatorData {
  indicator_major_year_id: number;
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
  major_image: string;
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

interface TotalNormalized {
  failed: number;
  fulfilled: number;
}

export interface YearNormalized {
  yearId: number;
  yearValue: number;
}

export interface IndicatorDataNormalized {
  indicatorMajorYearId: number;
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
  majorImage: string;
}

export interface IndicatorByIdMajorsNormalized {
  major: MajorsNormalized;
  indicatorData: IndicatorDataNormalized[];
  total: TotalNormalized;
}

export interface IndicatorByIdNormalized {
  indicatorId: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorMajors: IndicatorByIdMajorsNormalized[];
}
