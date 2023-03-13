export interface IndicatorMutationData {
  year_value: number;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface IndicatorMutationTypes {
  indicator_id: number;
  indicator_faculty_data: IndicatorMutationData[];
}
