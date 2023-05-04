import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorOverviewDataNormalized,
  IndicatorOverviewResponse,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorOverviewResponse) => {
  const result: IndicatorOverviewDataNormalized = {
    indicatorTotal: 0,
    indicatorDepartment: 0,
    indicatorMajor: 0,
    yearProgress: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.indicatorTotal = Deps.data.indicator_total;
    result.indicatorDepartment = Deps.data.indicator_department;
    result.indicatorMajor = Deps.data.indicator_major;
    Deps.data.year_progress.map((item) => {
      result.yearProgress.push({
        yearID: item.year_id,
        yearValue: item.year_value,
        count: item.count,
      });
    });
  }
  return result;
};

const useIndicatorOverview = (year_interval: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorOverviewResponse>(
    ['indicator-overview', year_interval],
    () => baseAPI.get('indicator/overview', { params: { year_interval } }),
    {
      refetchOnWindowFocus: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useIndicatorOverview;
