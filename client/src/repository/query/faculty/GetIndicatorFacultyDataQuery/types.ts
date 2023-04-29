export interface TargetQuarter {
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_quarter_id: number;
  is_target_fulfilled: boolean;
  year_id: number;
}

export interface FakultasIndikator {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  supervised_by: number;
  indicator_faculties: TargetQuarter;
}

export interface FakultasData {
  total_data: number;
  total_page: number;
  current_page: number;
  indicator_list: FakultasIndikator[];
}

export interface FakultasResponse {
  data: FakultasData;
}

// -- NORMALIZED TYPES -- //
export interface TargetQuarterNormalized {
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetQuarterID: number;
  isTargetFulfilled: boolean;
  yearID: number;
}

export interface FakultasIndikatorNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  supervisedBy: number;
  indicatorFaculties: TargetQuarterNormalized;
}

export interface FakultasDataNormalized {
  totalData: number;
  totalPage: number;
  currentPage: number;
  indicatorList: FakultasIndikatorNormalized[];
}
