interface TargerQuarter {
  target_quarter_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
  is_target_fulfilled: boolean;
  year_id: number;
}

interface IndicatorList {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  indicator_data_type: number;
  supervised_by: number;
  target_quarter: TargerQuarter;
}

export interface IndicatorByIDResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  indicator_list: IndicatorList[];
}

export interface IndicatorListResponse {
  data: IndicatorByIDResponse;
}

// -- NORMALIZED TYPES -- //
export interface IndicatorByIDResponseNormalized {
  totalData: number;
  totalPage: number;
  currentPage: number;
  indicatorList: MajorListNormalized[];
}

export interface MajorListNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  indicatorDataType: number;
  supervisedBy: number;
  targetQuarter: TargetQuarterNormalized;
}

interface TargetQuarterNormalized {
  targetQuarterID: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetValue: number;
  isTargetFulfilled: boolean;
  yearID: number;
}
