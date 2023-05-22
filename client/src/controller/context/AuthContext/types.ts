import type { ReactNode } from 'react';

export interface AuthContextInterface {
  isAuthenticated: boolean;
  roleID: number;
  isLoading: boolean;
}

export interface AuthContextProps {
  children: ReactNode;
}
