interface TargetQuarter {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
}

interface Data {
  major_id: string;
  target_quarter: TargetQuarter;
}

export interface BulkMajorProps {
  indicator_id: number;
  year_value: number;
  indicator_list: Data[];
}
