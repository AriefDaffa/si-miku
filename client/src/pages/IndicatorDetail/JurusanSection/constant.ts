export const tableHeader = [
  'No.',
  'Tahun',
  'Q1',
  'Q2',
  'Q3',
  'Q4',
  'Target',
  'Status indikator',
  '',
];

export const DialogStateDefaultValue = {
  state: false,
  major: { majorId: 0, majorName: '', majorImage: '' },
};

export const DialogFullValue = {
  state: false,
  indicatorName: '',
  major: { majorId: 0, majorName: '', majorImage: '' },
  data: {
    indicatorMajorYearId: 0,
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    target: 0,
    isTargetFulfilled: false,
    year: {
      yearId: 0,
      yearValue: 0,
    },
  },
};
