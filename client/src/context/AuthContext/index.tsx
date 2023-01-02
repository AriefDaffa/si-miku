import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';

import type { AuthContextInterface, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextInterface>({
  currentUser: {
    username: '',
    email: '',
  },
  isLoading: true,
});

export const AuthContextProvider: FC<AuthContextProps> = (props) => {
  const { children } = props;
  const { data, error, isLoading } = useCurrentUserQuery();
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (!isLoading && !error) {
      setCurrentUser({
        username: data.username,
        email: data.email,
      });
    }
  }, [isLoading, error]);

  const value: AuthContextInterface = useMemo(() => {
    return {
      currentUser,
      isLoading,
    };
  }, [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
