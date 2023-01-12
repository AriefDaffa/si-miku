import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import type { FC, SetStateAction } from 'react';

import useAuthStatusQuery from '@/repository/query/AuthStatusQuery';

import type { AuthContextInterface, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  // isLoading: true,
  setIsAuthenticated: () => {},
});

export const AuthContextProvider: FC<AuthContextProps> = (props) => {
  const { children } = props;
  // const { data, isLoading } = useAuthStatusQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (!isLoading && data.isAuthenticated) {
  //     setIsAuthenticated(true);
  //   }
  // }, [data, setIsAuthenticated]);

  const value: AuthContextInterface = useMemo(() => {
    return {
      isAuthenticated,
      // isLoading,
      setIsAuthenticated,
    };
  }, [isAuthenticated, setIsAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
