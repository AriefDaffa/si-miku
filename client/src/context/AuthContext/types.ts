import { Dispatch } from 'react';
import type { ReactNode, SetStateAction } from 'react';

// export interface User {
//   userName: string;
//   email: string;
// }

export interface AuthContextInterface {
  isAuthenticated: boolean;
  // isLoading: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface AuthContextProps {
  children: ReactNode;
}
