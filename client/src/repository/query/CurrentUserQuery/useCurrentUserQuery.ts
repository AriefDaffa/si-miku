import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type {
  CurrentUserResponse,
  CurrentUserResponseNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: CurrentUserResponse) => {
  const result: CurrentUserResponseNormalized = {
    userName: '',
    email: '',
    userImage: '',
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.userName = Deps.data.username || '';
    result.email = Deps.data.email || '';
    result.userImage =
      Deps.data.userImage === ''
        ? ''
        : import.meta.env.VITE_BASE_API_URL + Deps.data.userImage;
  }

  return result;
};

const useCurrentUserQuery = () => {
  const { data, ...rest } = useQuery<CurrentUserResponse>(
    'currentUser',
    () => baseAPI.get('current-user'),
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

export default useCurrentUserQuery;
