interface IndicatorYear {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  year_id: number;
}

export interface IndicatorMutationData {
  indicator_id: string;
  indicator_name: string;
  major_id: number;
  indicator_year: IndicatorYear[];
}
