import moment from 'moment';
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import type { FC } from 'react';

import type { CurrentYearInterface, CurrentYearProps } from './types';

const CurrentYear = createContext<CurrentYearInterface>({
  currentYear: '2023',
  setCurrentYear: () => {},
  handleSelectYear: (year: string | null) => {},
});

export const CurrentYearProvider: FC<CurrentYearProps> = (props) => {
  const { children } = props;
  const [currentYear, setCurrentYear] = useState('2023');

  const handleSelectYear = useCallback((year: string | null) => {
    if (year !== null) {
      setCurrentYear(String(moment(year).year()));
    }
  }, []);

  const value: CurrentYearInterface = useMemo(() => {
    return {
      currentYear,
      setCurrentYear,
      handleSelectYear,
    };
  }, [currentYear, setCurrentYear]);

  return <CurrentYear.Provider value={value}>{children}</CurrentYear.Provider>;
};

export const useCurrentYear = () => useContext(CurrentYear);
