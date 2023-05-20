import { Dispatch } from 'react';
import type { ReactNode, SetStateAction } from 'react';

export interface CurrentYearInterface {
  currentYear: string;
  setCurrentYear: Dispatch<SetStateAction<string>>;
  handleSelectYear: (year: string | null) => void;
}

export interface CurrentYearProps {
  children: ReactNode;
}
