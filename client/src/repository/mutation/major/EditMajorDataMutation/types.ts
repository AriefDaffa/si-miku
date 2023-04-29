export interface EditMajorData {
  target_quarter_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
  department_id: number;
  year_id: number;
}

export interface EditMajorDataPayload {
  id: number;
  data: EditMajorData;
}
