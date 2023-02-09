import type { ReactNode } from 'react';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

export interface AuthContextInterface {
  isLoading: boolean;
  user: CurrentUserResponseNormalized;
}

export interface AuthContextProps {
  children: ReactNode;
}
