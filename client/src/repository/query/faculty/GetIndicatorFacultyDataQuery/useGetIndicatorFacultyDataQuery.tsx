import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { FakultasResponse, FakultasDataNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: FakultasResponse) => {
  const result: FakultasDataNormalized = {
    totalData: 0,
    totalPage: 0,
    currentPage: 0,
    indicatorList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.totalData = Deps.data.total_data;
    result.totalPage = Deps.data.total_page;
    result.currentPage = Deps.data.current_page;
    Deps.data.indicator_list.map((item) => {
      result.indicatorList.push({
        indicatorID: item.indicator_id,
        indicatorCode: item.indicator_code,
        indicatorName: item.indicator_name,
        supervisedBy: item.supervised_by,
        indicatorType: item.indicator_type,
        indicatorFaculties: {
          targetQuarterID: item.indicator_faculties.target_quarter_id,
          q1: item.indicator_faculties.q1,
          q2: item.indicator_faculties.q2,
          q3: item.indicator_faculties.q3,
          q4: item.indicator_faculties.q4,
          targetValue: item.indicator_faculties.target_value,
          isTargetFulfilled: item.indicator_faculties.is_target_fulfilled,
          yearID: item.indicator_faculties.year_id,
        },
      });
    });
  }

  return result;
};

const useGetIndicatorFacultyDataQuery = (
  size: number,
  keyword: string,
  page: number,
  year_value: string
) => {
  const { data, ...rest } = useQuery<FakultasResponse>(
    ['indicator-faculty', size, keyword, page, year_value],
    () =>
      baseAPI.get(`indicator/faculty`, {
        params: { size, page, keyword, year_value },
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useGetIndicatorFacultyDataQuery;
