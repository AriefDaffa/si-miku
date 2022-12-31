export interface IndicatorByYearTargetQuarters {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
}

export interface IndicatorByYearArray {
  indicator_id: number;
  indicator_name: string;
  target_quarters: IndicatorByYearTargetQuarters;
}

export interface IndicatorByYearData {
  year_id: number;
  indicators: IndicatorByYearArray[];
}

export interface IndicatorByYearResponse {
  data: IndicatorByYearData;
}

export interface IndicatorByYearNormalizedData {
  indicatorId: number;
  indicatorName: string;
  quarterOne: number;
  quarterTwo: number;
  quarterThree: number;
  quarterFour: number;
  target: number;
}

export interface IndicatorByYearNormalized {
  yearId: number;
  indicator: IndicatorByYearNormalizedData[];
}
