interface Data {
  indicator_code: string;
  indicator_name: string;
  supervised_by: number;
}

export interface IndicatorMutationData {
  indicator_list: Data[];
}
