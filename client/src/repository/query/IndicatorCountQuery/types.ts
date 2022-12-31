export interface IndicatorCountData {
  total: number;
  success: number;
  failed: number;
}

export interface IndicatorCountResponse {
  data: IndicatorCountData;
}
