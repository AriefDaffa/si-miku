import { Dispatch } from 'react';
import type { ReactNode, SetStateAction } from 'react';

export interface SideBarContextInterface {
  isMinimized: boolean;
  setIsMinimized: Dispatch<SetStateAction<boolean>>;
}

export interface SideBarContextProps {
  children: ReactNode;
}
