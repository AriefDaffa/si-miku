interface Count {
  failed: number;
  fulfilled: number;
}

interface IndicatorList {
  indicator_id: number;
  indicator_name: string;
  indicator_code: string;
  is_faculty_indicator: boolean;
  count: Count;
}

export interface IndicatorListData {
  total_page: number;
  total_data: number;
  current_page: number;
  indicator_list: IndicatorList[];
}

export interface IndicatorListResponse {
  data: IndicatorListData;
}

// -- NORMALIZED TYPES -- //

export interface IndicatorListNormalized {
  indicatorID: number;
  indicatorName: string;
  indicatorCode: string;
  isFacultyIndicator: boolean;
  count: Count;
}

export interface IndicatorNormalized {
  totalPage: number;
  totalData: number;
  currentPage: number;
  indicatorList: IndicatorListNormalized[];
}
