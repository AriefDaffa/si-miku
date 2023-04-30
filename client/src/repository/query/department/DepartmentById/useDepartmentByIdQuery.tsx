import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorListResponse,
  IndicatorByIDResponseNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorByIDResponseNormalized = {
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
    indicatorList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.currentPage = Deps.data.current_page;
    result.totalData = Deps.data.total_data;
    result.totalPage = Deps.data.total_page;
    Deps.data.indicator_list.map((item) => {
      result.indicatorList.push({
        indicatorID: item.indicator_id,
        indicatorCode: item.indicator_code,
        indicatorName: item.indicator_name,
        indicatorDataType: item.indicator_data_type,
        indicatorType: item.indicator_type,
        supervisedBy: item.supervised_by,
        targetQuarter: {
          q1: item.target_quarter.q1,
          q2: item.target_quarter.q2,
          q3: item.target_quarter.q3,
          q4: item.target_quarter.q4,
          isTargetFulfilled: item.target_quarter.is_target_fulfilled,
          targetQuarterID: item.target_quarter.target_quarter_id,
          targetValue: item.target_quarter.target_value,
          yearID: item.target_quarter.year_id,
        },
      });
    });
  }
  return result;
};

const useDepartmentByIdQuery = (
  id: number,
  keyword: string,
  size: number,
  page: number,
  year_value: number
) => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    ['department', id, size, page, keyword, year_value],
    () =>
      baseAPI.get(`department/${id}`, {
        params: { size, page, keyword, year_value },
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useDepartmentByIdQuery;
