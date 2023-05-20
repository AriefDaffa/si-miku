import { createContext, useContext, useMemo, useState } from 'react';
import type { FC } from 'react';

import type { HeadlineInterface, HeadlineProps } from './types';

const Headline = createContext<HeadlineInterface>({
  headline: {
    title: '',
    subTitle: '',
    isYearPickerEnabled: false,
  },
  setHeadline: () => {},
});

export const HeadlineProvider: FC<HeadlineProps> = (props) => {
  const { children } = props;
  const [headline, setHeadline] = useState({
    title: '',
    subTitle: '',
    isYearPickerEnabled: false,
  });

  const value: HeadlineInterface = useMemo(() => {
    return {
      headline,
      setHeadline,
    };
  }, [headline, setHeadline]);

  return <Headline.Provider value={value}>{children}</Headline.Provider>;
};

export const useHeadline = () => useContext(Headline);
