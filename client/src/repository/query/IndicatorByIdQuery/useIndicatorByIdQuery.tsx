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
      const {
        is_target_fulfilled,
        q1,
        q2,
        q3,
        q4,
        target_value,
        year_id,
        year_value,
      } = item;

      result.facultyIndicators.data.push({
        isTargetFulfilled: is_target_fulfilled,
        q1,
        q2,
        q3,
        q4,
        targetValue: target_value,
        yearID: year_id,
        yearValue: year_value,
      });
    });
    Deps.data.major_indicators.data.map((item) => {
      const { major_data, major_id, major_image, major_name } = item;

      result.majorIndicators.data.push({
        majorID: major_id,
        majorImage: major_image,
        majorName: major_name,
        majorData: major_data.map((data) => {
          const {
            is_target_fulfilled,
            q1,
            q2,
            q3,
            q4,
            target_value,
            year_id,
            year_value,
          } = data;

          return {
            isTargetFulfilled: is_target_fulfilled,
            q1,
            q2,
            q3,
            q4,
            targetValue: target_value,
            yearID: year_id,
            yearValue: year_value,
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
