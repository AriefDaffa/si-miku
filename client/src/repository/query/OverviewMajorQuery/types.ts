export interface Count {
  fulfilled: number;
  failed: number;
}

export interface MajorList {
  major_id: number;
  major_name: string;
  major_image: string;
  count: Count;
}

export interface OverviewMajorData {
  total_fulfilled: number;
  total_failed: number;
  major_list: MajorList[];
}

export interface OverviewMajorResponse {
  data: OverviewMajorData;
}

// -- NORMALIZED TYPES -- //

export interface MajorListNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  count: Count;
}

export interface OverviewMajorNormalized {
  totalFulfilled: number;
  totalFailed: number;
  majorList: MajorListNormalized[];
}
