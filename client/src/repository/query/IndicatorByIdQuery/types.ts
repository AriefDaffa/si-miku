export interface IndicatorByIdTargetQuarters {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
}

export interface IndicatorByIdYear {
  year_id: number;
  target_quarters: IndicatorByIdTargetQuarters;
}

export interface IndicatorByIdData {
  indicator_id: number;
  indicator_name: string;
  years: IndicatorByIdYear[];
}

export interface IndicatorByIdResponse {
  data: IndicatorByIdData;
}

// -- NORMALIZED TYPES -- //

export interface IndicatorTargetQuartersNormalized {
  quarterOne: number;
  quarterTwo: number;
  quarterThree: number;
  quarterFour: number;
  target: number;
  status: string;
}

export interface IndicatorYearNormalized {
  yearId: number;
  //   targetQuarters: IndicatorTargetQuartersNormalized;
  quarterOne: number;
  quarterTwo: number;
  quarterThree: number;
  quarterFour: number;
  target: number;
  status: string;
}

export interface IndicatorByIdResponseNormalized {
  indicatorID: number;
  indicatorName: string;
  years: IndicatorYearNormalized[];
}
