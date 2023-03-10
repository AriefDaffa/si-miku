export interface Count {
  failed: number;
  fulfilled: number;
}

export interface IndicatorList {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  is_faculty_indicator: boolean;
  count: Count;
}

export interface IndicatorByMajorData {
  major_id: number;
  major_name: string;
  major_image: string;
  total_fulfilled: number;
  total_failed: number;
  indicator_list: IndicatorList[];
}

export interface IndicatorByMajorResponse {
  data: IndicatorByMajorData;
}

// -- NORMALIZED TYPES -- //

export interface IndicatorListNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  isFacultyIndicator: boolean;
  count: Count;
}

export interface IndicatorByMajorNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  totalFulfilled: number;
  totalFailed: number;
  indicatorList: IndicatorListNormalized[];
}
