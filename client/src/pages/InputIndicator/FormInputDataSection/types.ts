interface IndicatorValue {
  year_value: number;
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

interface IndicatorData {
  major_id: number;
  indicator_value: IndicatorValue;
}

export interface DefaultValueTypes {
  indicator_id: number;
  indicator_data: IndicatorData[];
}
