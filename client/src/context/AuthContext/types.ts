import type { ReactNode } from 'react';

export interface User {
  username: string;
  email: string;
}

export interface AuthContextInterface {
  isLoggedIn: boolean;
  currentUser: User;
  setCurrentUser: (data: User) => void;
}

export interface AuthContextProps {
  children: ReactNode;
}
