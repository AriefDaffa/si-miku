import { useLocation } from 'react-router-dom';
import { createContext, useContext, useMemo } from 'react';
import type { FC } from 'react';

import useAuthStatusQuery from '@/repository/query/auth/AuthStatusQuery';

import type { AuthContextInterface, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  roleID: 0,
  isLoading: true,
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
      roleID: data.roleID,
      isLoading,
    };
  }, [data, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
