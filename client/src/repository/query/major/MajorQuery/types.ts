export interface MajorOverviewData {
  major_id: number;
  major_name: string;
  major_image: string;
}

export interface MajorOverviewResponse {
  data: MajorOverviewData[];
}

// -- NORMALIZED TYPES -- //

export interface MajorOverviewNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
}
