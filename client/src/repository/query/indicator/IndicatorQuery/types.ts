interface IndicatorList {
  indicator_id: number;
  indicator_name: string;
  indicator_code: string;
  indicator_type: number;
  supervised_by: number;
}

interface IndicatorDepartment {}
interface IndicatorFaculty {}
interface IndicatorMajor {}

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
  indicatorType: number;
  supervisedBy: number;
}

export interface IndicatorNormalized {
  totalPage: number;
  totalData: number;
  currentPage: number;
  indicatorList: IndicatorListNormalized[];
}
