export interface Year {
  year_id: number;
  year_value: number;
}

export interface TargetQuarter {
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_quarter_id: number;
  is_target_fulfilled: boolean;
  year: Year;
}

interface TargetMajor {
  target_major_id: number;
  target_quarter: TargetQuarter;
}

interface Indicator {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  indicator_data_type: number;
}

export interface IndicatorMajors {
  indicator_major_id: number;
  indicator: Indicator;
  target_majors: TargetMajor[];
}

export interface MajorOverviewData {
  major_id: number;
  major_name: string;
  major_image: string;
  total_data: number;
  total_page: number;
  current_page: number;
  indicator_majors: IndicatorMajors[];
}

export interface MajorOverviewResponse {
  data: MajorOverviewData;
}

// -- NORMALIZED TYPES -- //
interface YearNormalized {
  yearID: number;
  yearValue: number;
}

interface TargetQuarterNormalized {
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetQuarterID: number;
  isTargetFulfilled: boolean;
  year: YearNormalized;
}

interface TargetMajorNormalized {
  targetMajorID: number;
  targetQuarter: TargetQuarterNormalized;
}

interface IndicatorNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  indicatorDataType: number;
}

export interface IndicatorMajorsNormalized {
  indicatorMajorID: number;
  indicator: IndicatorNormalized;
  targetMajors: TargetMajorNormalized[];
}

export interface MajorOverviewNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  totalData: number;
  totalPage: number;
  currentPage: number;
  indicatorMajors: IndicatorMajorsNormalized[];
}
