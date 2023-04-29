import type { ReactNode } from 'react';

export interface AuthContextInterface {
  isAuthenticated: boolean;
  isManagement: boolean;
}

export interface AuthContextProps {
  children: ReactNode;
}
