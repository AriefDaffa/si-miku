import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  IndicatorByIdResponse,
  IndicatorByIdDataNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorByIdResponse) => {
  const result: IndicatorByIdDataNormalized = {
    indicatorID: 0,
    indicatorCode: '',
    indicatorName: '',
    isFacultyIndicator: false,
    facultyIndicators: {
      count: {
        failed: 0,
        fulfilled: 0,
      },
      data: [],
    },
    majorIndicators: {
      count: {
        failed: 0,
        fulfilled: 0,
      },
      data: [],
    },
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.indicatorID = Deps.data.indicator_id;
    result.indicatorCode = Deps.data.indicator_code;
    result.indicatorName = Deps.data.indicator_name;
    result.isFacultyIndicator = Deps.data.is_faculty_indicator;
    result.facultyIndicators.count = Deps.data.faculty_indicators.count;
    result.majorIndicators.count = Deps.data.major_indicators.count;
    Deps.data.faculty_indicators.data.map((item) => {
      result.facultyIndicators.data.push({
        isTargetFulfilled: item.is_target_fulfilled,
        q1: item.q1,
        q2: item.q2,
        q3: item.q3,
        q4: item.q4,
        targetValue: item.target_value,
        yearID: item.year_id,
        yearValue: item.year_value,
        targetQuarterID: item.target_quarter_id,
      });
    });
    Deps.data.major_indicators.data.map((item) => {
      const { major_data, major_id, major_image, major_name } = item;

      result.majorIndicators.data.push({
        majorID: major_id,
        majorImage:
          major_image === ''
            ? ''
            : import.meta.env.VITE_BASE_API_URL + major_image,
        majorName: major_name,
        majorData: major_data.map((data) => {
          return {
            isTargetFulfilled: data.is_target_fulfilled,
            q1: data.q1,
            q2: data.q2,
            q3: data.q3,
            q4: data.q4,
            targetValue: data.target_value,
            yearID: data.year_id,
            yearValue: data.year_value,
            targetQuarterID: data.target_quarter_id,
          };
        }),
      });
    });
  }

  return result;
};

const useIndicatorByIdQuery = (id: string, enabled?: boolean) => {
  const { data, ...rest } = useQuery<IndicatorByIdResponse>(
    ['indicator', id],
    () => baseAPI.get(`indicator/${id}`),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled,
    }
  );

  // normalize the data to prevent undefined value
  // memoize the data
  return useMemo(() => {
    return { data: normalizer(data), ...rest };
  }, [data, rest]);
};

export default useIndicatorByIdQuery;
