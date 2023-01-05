export interface IndicatorData {
  indicator_id: number;
  indicator_name: string;
}

export interface IndicatorResponse {
  data: IndicatorData[];
}

// -- NORMALIZED TYPES -- //

export interface IndicatorResponseNormalized {
  indicatorID: number;
  indicatorName: string;
}
