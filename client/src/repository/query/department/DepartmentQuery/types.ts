export interface IndicatorListData {
  department_id: number;
  department_name: string;
  department_image: string;
}

export interface IndicatorListResponse {
  data: IndicatorListData[];
}

// -- NORMALIZED TYPES -- //

export interface IndicatorListNormalized {
  departmentID: number;
  departmentName: string;
  departmentImage: string;
}
