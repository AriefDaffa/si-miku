import { createContext, useContext, useMemo } from 'react';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';

import type { AuthContextInterface, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextInterface>({
  user: {
    email: '',
    userImage: '',
    userName: '',
  },
  isLoading: true,
});

export const AuthContextProvider: FC<AuthContextProps> = (props) => {
  const { children } = props;
  const { data, isLoading } = useCurrentUserQuery();

  const value: AuthContextInterface = useMemo(() => {
    return {
      user: data,
      isLoading,
    };
  }, [data, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
