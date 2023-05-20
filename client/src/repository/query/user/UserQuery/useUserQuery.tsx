import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { UserResponse, UserDataOverviewNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: UserResponse) => {
  const result: UserDataOverviewNormalized = {
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
    userList: [],
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.currentPage = Deps.data.current_page;
    result.totalData = Deps.data.total_data;
    result.totalPage = Deps.data.total_page;
    Deps.data.user_list.map((item) => {
      result.userList.push({
        userID: item.user_id,
        userEmail: item.user_email,
        userName: item.user_name,
        userImage:
          item.user_image === '' || item.user_image === null
            ? ''
            : import.meta.env.VITE_BASE_API_URL + item.user_image,
      });
    });
  }

  return result;
};

const useUserQuery = (
  id: number,
  size: number,
  keyword: string,
  page: number
) => {
  const { data, ...rest } = useQuery<UserResponse>(
    ['user', id, size, page, keyword],
    () => baseAPI.get(`users/${id}`, { params: { size, page, keyword } }),
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

export default useUserQuery;
