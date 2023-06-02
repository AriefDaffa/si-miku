export interface EditFacultyData {
  target_quarter_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_value: number;
}

export interface EditFacultyDataPayload {
  id: number;
  data: EditFacultyData;
}
