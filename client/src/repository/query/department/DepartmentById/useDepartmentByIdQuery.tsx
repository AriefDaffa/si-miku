import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  IndicatorListResponse,
  IndicatorListDataNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: IndicatorListResponse) => {
  const result: IndicatorListDataNormalized = {
    departmentID: 0,
    departmentName: '',
    departmentImage: '',
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
    indicatorDepartment: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.departmentID = Deps.data.department_id;
    result.departmentName = Deps.data.department_name;
    result.currentPage = Deps.data.current_page;
    result.totalData = Deps.data.total_data;
    result.totalPage = Deps.data.total_page;
    (result.departmentImage =
      Deps.data.department_image !== '' || Deps.data.department_image !== null
        ? import.meta.env.VITE_BASE_API_URL + Deps.data.department_image
        : ''),
      Deps.data.indicator_departments.map((item) => {
        result.indicatorDepartment.push({
          indicatorDepartmentID: item.indicator_department_id,
          indicator: {
            indicatorID: item.indicator.indicator_id,
            indicatorCode: item.indicator.indicator_code,
            indicatorName: item.indicator.indicator_name,
            indicatorType: item.indicator.indicator_type,
            supervisedBy: item.indicator.supervised_by,
            createdBy: item.indicator.created_by,
          },
          targetDeps: item.target_deps.map((data) => {
            return {
              targetQuarter: {
                q1: data.target_quarter.q1,
                q2: data.target_quarter.q2,
                q3: data.target_quarter.q3,
                q4: data.target_quarter.q4,
                isTargetFulfilled: data.target_quarter.is_target_fulfilled,
                targetQuarterID: data.target_quarter.target_quarter_id,
                targetValue: data.target_quarter.target_value,
                year: {
                  yearID: data.target_quarter.year.year_id,
                  yearValue: data.target_quarter.year.year_value,
                },
              },
            };
          }),
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
  enabled?: boolean
) => {
  const { data, ...rest } = useQuery<IndicatorListResponse>(
    ['department', id, size, page, keyword],
    () => baseAPI.get(`department/${id}`, { params: { size, page, keyword } }),
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

export default useDepartmentByIdQuery;
