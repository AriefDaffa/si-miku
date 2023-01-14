interface IndicatorValue {
  target: number;
  year: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

// interface IndicatorCode {
//   code: string;
// }

export interface FormValues {
  indicatorCode: string;
  indicatorName: string;
  jurusan: string;
  indicatorValue: IndicatorValue[];
}
