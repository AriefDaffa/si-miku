interface Year {
  year_id: number;
  year_value: number;
}

export interface IndicatorListData {
  indicator_department_id: number;
  year: Year;
}

export interface IndicatorListResponse {
  data: IndicatorListData[];
}

// -- NORMALIZED TYPES -- //

interface YearNormalized {
  yearID: number;
  yearValue: number;
}

export interface IndicatorListDataNormalized {
  indicatorDepartmentID: number;
  year: YearNormalized;
}
