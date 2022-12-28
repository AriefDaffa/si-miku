import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import type { FC } from 'react';

import type { AuthContextInterface, AuthContextProps, User } from './types';

const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  currentUser: {
    username: '',
    email: '',
  },
  setCurrentUser: (data: User) => {},
});

export const AuthContextProvider: FC<AuthContextProps> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
  });

  const setUser = useCallback(
    (data: User) => {
      setCurrentUser(data);
    },
    [setCurrentUser]
  );

  const value: AuthContextInterface = useMemo(() => {
    return {
      isLoggedIn: false,
      currentUser,
      setCurrentUser: setUser,
    };
  }, [currentUser, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
