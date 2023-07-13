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
    Deps.data.user_list?.map((item) => {
      result.userList.push({
        userID: item.user_id,
        userEmail: item.user_email,
        profession: item.profession,
        userImage:
          item.user_image === '' || item.user_image === null
            ? ''
            : item.user_image,
        accessLevel: item.access_level,
        role: {
          roleID: item.role.role_id,
          roleName: item.role.role_name,
        },
      });
    });
  }

  return result;
};

const useUserQuery = (size: number, keyword: string, page: number) => {
  const { data, ...rest } = useQuery<UserResponse>(
    ['user', size, page, keyword],
    () => baseAPI.get(`users`, { params: { size, page, keyword } }),
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
