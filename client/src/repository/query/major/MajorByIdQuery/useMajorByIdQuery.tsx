import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { MajorOverviewNormalized, MajorOverviewResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: MajorOverviewResponse) => {
  const result: MajorOverviewNormalized = {
    majorID: 0,
    majorName: '',
    majorImage: '',
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
    indicatorMajors: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.majorID = Deps.data.major_id;
    result.majorName = Deps.data.major_name;
    result.majorImage =
      Deps.data.major_image !== '' || Deps.data.major_image !== null
        ? import.meta.env.VITE_BASE_API_URL + Deps.data.major_image
        : '';
    result.currentPage = Deps.data.current_page;
    result.totalData = Deps.data.total_data;
    result.totalPage = Deps.data.total_page;
    Deps.data.indicator_majors.map((item) => {
      result.indicatorMajors.push({
        indicatorMajorID: item.indicator_major_id,
        indicator: {
          indicatorCode: item.indicator.indicator_code,
          indicatorID: item.indicator.indicator_id,
          indicatorName: item.indicator.indicator_name,
          indicatorType: item.indicator.indicator_type,
          indicatorDataType: item.indicator.indicator_data_type,
        },
        targetMajors: item.target_majors.map((data) => {
          return {
            targetMajorID: data.target_major_id,
            targetQuarter: {
              q1: data.target_quarter.q1,
              q2: data.target_quarter.q2,
              q3: data.target_quarter.q3,
              q4: data.target_quarter.q4,
              targetQuarterID: data.target_quarter.target_quarter_id,
              targetValue: data.target_quarter.target_value,
              isTargetFulfilled: data.target_quarter.is_target_fulfilled,
              year: {
                yearID: data.target_quarter.year.year_id,
                yearValue: data.target_quarter.year.year_value,
              },
            },
          };
        }),
      });
    });

    return result;
  }

  return result;
};

const useMajorByIdQuery = (
  id: number,
  keyword: string,
  size: number,
  page: number
) => {
  const { data, ...rest } = useQuery<MajorOverviewResponse>(
    ['major', id, size, page, keyword],
    () => baseAPI.get(`major/${id}`, { params: { size, page, keyword } }),
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

export default useMajorByIdQuery;
