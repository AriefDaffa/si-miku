interface IndicatorData {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
  year_value: number;
}

export interface InputDataFacultyPayload {
  indicator_id: number;
  indicator_data: IndicatorData;
}
