interface Data {
  indicator_code: string;
  indicator_name: string;
  is_faculty_indicator: boolean;
}

export interface IndicatorMutationData {
  indicator: Data[];
}
