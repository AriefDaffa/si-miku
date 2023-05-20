import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { IndicatorListResponse, IndicatorNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorNormalized = {
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
        indicatorType: item.indicator_type,
        supervisedBy: item.supervised_by,
      });
    });
  }
  return result;
};

const useIndicatorQuery = (size: number, keyword: string, page: number) => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    ['indicator-list', size, page, keyword],
    () => baseAPI.get('indicator', { params: { size, page, keyword } }),
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

export default useIndicatorQuery;
