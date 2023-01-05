import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { AuthStatusNormalized, AuthStatusResponse } from './types';

// normalize the data to prevent undefined value
const normalizer = (Deps?: AuthStatusResponse) => {
  const result: AuthStatusNormalized = {
    isAuthenticated: false,
  };

  if (Deps !== void 0 && !(Deps instanceof AxiosError)) {
    result.isAuthenticated = true;
  }

  return result;
};

const useAuthStatusQuery = () => {
  const { data, ...rest } = useQuery<AuthStatusResponse>(
    'authStatus',
    () => baseAPI.get('auth-status'),
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

export default useAuthStatusQuery;
