export interface Year {
  year_id: number;
  year_value: number;
}

export interface UserResponse {
  data: Year[];
}

// -- NORMALIZED TYPES -- //

export interface YearNormalized {
  yearID: number;
  yearValue: number;
}
