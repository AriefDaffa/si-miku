import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { UserResponse, UserDataNormalized } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: UserResponse) => {
  const result: UserDataNormalized[] = [];

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    Deps.data.map((item) => {
      result.push({
        userID: item.user_id,
        userEmail: item.user_email,
        userName: item.user_name,
        userImage:
          item.user_image === ''
            ? ''
            : import.meta.env.VITE_BASE_API_URL + item.user_image,
      });
    });
  }

  return result;
};

const useUserQuery = (id: number, disabled?: boolean) => {
  const { data, ...rest } = useQuery<UserResponse>(
    ['user', id],
    () => baseAPI.get(`users/${id}`),
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

export default useUserQuery;
