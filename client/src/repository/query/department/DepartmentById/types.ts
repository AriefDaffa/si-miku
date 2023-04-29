interface Indicator {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  created_by: number;
  supervised_by: number;
}

interface TargetQuarter {
  target_quarter_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
  is_target_fulfilled: boolean;
  year: Year;
}

interface Year {
  year_id: number;
  year_value: number;
}

interface TargetDeps {
  target_quarter: TargetQuarter;
}

interface IndicatorDepartment {
  indicator_department_id: number;
  indicator: Indicator;
  target_deps: TargetDeps[];
}

export interface IndicatorListData {
  department_id: number;
  department_name: string;
  department_image: string;
  total_data: number;
  total_page: number;
  current_page: number;
  indicator_departments: IndicatorDepartment[];
}

export interface IndicatorListResponse {
  data: IndicatorListData;
}

// -- NORMALIZED TYPES -- //
interface IndicatorNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  createdBy: number;
  supervisedBy: number;
}

interface TargetQuarterNormalized {
  targetQuarterID: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetValue: number;
  isTargetFulfilled: boolean;
  year: YearNormalized;
}

interface YearNormalized {
  yearID: number;
  yearValue: number;
}

interface TargetDepsNormalized {
  targetQuarter: TargetQuarterNormalized;
}

export interface IndicatorDepartmentNormalized {
  indicatorDepartmentID: number;
  indicator: IndicatorNormalized;
  targetDeps: TargetDepsNormalized[];
}

export interface IndicatorListDataNormalized {
  departmentID: number;
  departmentName: string;
  departmentImage: string;
  totalData: number;
  totalPage: number;
  currentPage: number;
  indicatorDepartment: IndicatorDepartmentNormalized[];
}
