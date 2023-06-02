import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type {
  CurrentUserResponse,
  CurrentUserResponseNormalized,
} from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: CurrentUserResponse) => {
  const result: CurrentUserResponseNormalized = {
    profession: '',
    email: '',
    userImage: '',
    role: '',
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.profession = Deps.data.profession || '';
    result.email = Deps.data.email || '';
    result.role = Deps.data.role || '';
    result.userImage =
      Deps.data.userImage === '' || Deps.data.userImage === null
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
