import { useMemo } from 'react';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { CurrentUserData, CurrentUserResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (isLoading: boolean, Deps?: CurrentUserResponse) => {
  const result: CurrentUserData = {
    username: '',
    email: '',
  };

  if (!isLoading && Deps) {
    result.username = Deps.data.username || '';
    result.email = Deps.data.email || '';
  }

  return result;
};

const useCurrentUserQuery = () => {
  const { data, isLoading, ...rest } = useQuery<CurrentUserResponse>(
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
    return { data: normalizer(isLoading, data), isLoading, ...rest };
  }, [data, isLoading, rest]);
};

export default useCurrentUserQuery;
