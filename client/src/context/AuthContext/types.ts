import type { ReactNode } from 'react';

export interface User {
  username: string;
  email: string;
}

export interface AuthContextInterface {
  currentUser: User;
  isLoading: boolean;
}

export interface AuthContextProps {
  children: ReactNode;
}
