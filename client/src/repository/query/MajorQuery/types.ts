export interface MajorOverviewData {
  major_id: number;
  major_name: string;
}

export interface MajorOverviewResponse {
  data: MajorOverviewData[];
}

// -- NORMALIZED TYPES -- //

export interface MajorOverviewNormalized {
  majorID: number;
  majorName: string;
}
