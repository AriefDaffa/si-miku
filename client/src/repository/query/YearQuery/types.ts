export interface YearData {
  year_value: number;
}

export interface YearResponse {
  data: YearData[];
}

// -- NORMALIZED TYPES -- //

export interface YearDataNormalized {
  yearValue: number;
}
