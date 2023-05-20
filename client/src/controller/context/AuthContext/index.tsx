import { useLocation } from 'react-router-dom';
import { createContext, useContext, useMemo } from 'react';
import type { FC } from 'react';

import useAuthStatusQuery from '@/repository/query/auth/AuthStatusQuery';

import type { AuthContextInterface, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  isManagement: false,
});

export const AuthContextProvider: FC<AuthContextProps> = (props) => {
  const { children } = props;

  const location = useLocation();

  const { data, isLoading } = useAuthStatusQuery(
    location.pathname.includes('login')
  );

  const value: AuthContextInterface = useMemo(() => {
    return {
      isAuthenticated: data.isAuthenticated,
      isManagement: data.isManagement,
    };
  }, [data, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
