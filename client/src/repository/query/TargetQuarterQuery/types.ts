interface TargetQuarterChild {
  year_id: number;
  year_value: number;
  total: number;
}

export interface TargetQuarterData {
  failed_target: TargetQuarterChild[];
  success_target: TargetQuarterChild[];
}

export interface TargetQuarterResponse {
  data: TargetQuarterData;
}

// -- NORMALIZED TYPES -- //

interface TargetQuarterChildNormalized {
  yearId: number;
  yearValue: number;
  total: number;
}

export interface TargetQuarterNormalized {
  failedTarget: TargetQuarterChildNormalized[];
  successTarget: TargetQuarterChildNormalized[];
}
