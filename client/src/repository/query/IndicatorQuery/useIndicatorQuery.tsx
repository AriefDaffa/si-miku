import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorListResponse, IndicatorNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorNormalized = {
    // totalPage: 0,
    // totalData: 0,
    // currentPage: 0,
    indicatorList: [],
    splittedList: {
      facultyIndicator: [],
      majorIndicator: [],
    },
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    // result.totalPage = Deps.data.total_page || 0;
    // result.totalData = Deps.data.total_data || 0;
    // result.currentPage = Deps.data.current_page || 0;
    Deps.data.indicator_list.map((item) => {
      result.indicatorList.push({
        indicatorCode: item.indicator_code,
        indicatorName: item.indicator_name,
        indicatorID: item.indicator_id,
        isFacultyIndicator: item.is_faculty_indicator,
        count: item.count,
      });
    });
    Deps.data.indicator_list.map((item) => {
      if (item.is_faculty_indicator === true) {
        result.splittedList.facultyIndicator.push({
          indicatorCode: item.indicator_code,
          indicatorName: item.indicator_name,
          indicatorID: item.indicator_id,
          isFacultyIndicator: item.is_faculty_indicator,
          count: item.count,
        });
      } else {
        result.splittedList.majorIndicator.push({
          indicatorCode: item.indicator_code,
          indicatorName: item.indicator_name,
          indicatorID: item.indicator_id,
          isFacultyIndicator: item.is_faculty_indicator,
          count: item.count,
        });
      }
    });
  }
  return result;
};

const useIndicatorQuery = (disabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    'indicator-list',
    () => baseAPI.get('indicator'),
    {
      refetchOnWindowFocus: false,
      enabled: !disabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useIndicatorQuery;
