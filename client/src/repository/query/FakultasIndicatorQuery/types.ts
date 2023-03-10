export interface Count {
  fulfilled: number;
  failed: number;
}

export interface FakultasIndikator {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  is_faculty_indicator: boolean;
  count: Count;
}

export interface FakultasData {
  total_data: number;
  total_fulfilled: number;
  total_failed: number;
  indicator_list: FakultasIndikator[];
}

export interface FakultasResponse {
  data: FakultasData;
}

// -- NORMALIZED TYPES -- //

export interface FakultasIndikatorNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  isFacultyIndicator: boolean;
  count: Count;
}

export interface FakultasDataNormalized {
  totalData: number;
  totalFulfilled: number;
  totalFailed: number;
  indicatorList: FakultasIndikatorNormalized[];
}
