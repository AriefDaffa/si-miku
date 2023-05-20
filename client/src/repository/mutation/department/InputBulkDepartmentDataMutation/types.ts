interface TargetQuarter {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
}

interface Data {
  department_id: string;
  target_quarter: TargetQuarter;
}

export interface BulkDepartmentProps {
  indicator_id: number;
  year_value: number;
  is_overwrite: boolean;
  indicator_list: Data[];
}
