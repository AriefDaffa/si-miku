import { useMemo } from 'react';

interface useChartSeriesDeps {
  chartType: string;
  indicatorName: string[];
  data: object[];
}

const areaValue = useMemo(() => {}, []);

// @TODO add custom hooks
const useChartSeries = (Deps: useChartSeriesDeps) => {
  const { chartType } = Deps;

  switch (chartType) {
    case 'area':
      return areaValue;
    default:
      return;
  }
};

export default useChartSeries;
