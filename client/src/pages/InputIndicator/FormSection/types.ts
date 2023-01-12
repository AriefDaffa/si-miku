interface IndicatorValue {
  target: number;
  year: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface FormValues {
  indicatorName: string;
  jurusan: string;
  indicatorValue: IndicatorValue[];
}
