export interface IndicatorMutationData {
  year_value: number;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface IndicatorMajorData {
  major_id: number;
  major_data: IndicatorMutationData[];
}

export interface IndicatorMutationTypes {
  indicator_id: number;
  indicator_major_data: IndicatorMajorData[];
}
