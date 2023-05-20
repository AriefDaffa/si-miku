import { createContext, useContext, useMemo, useState } from 'react';
import type { FC } from 'react';

import type { SideBarContextInterface, SideBarContextProps } from './types';

const SideBar = createContext<SideBarContextInterface>({
  isMinimized: false,
  setIsMinimized: () => {},
});

export const SideBarProvider: FC<SideBarContextProps> = (props) => {
  const { children } = props;
  const [isMinimized, setIsMinimized] = useState(false);

  const value: SideBarContextInterface = useMemo(() => {
    return {
      isMinimized,
      setIsMinimized,
    };
  }, [isMinimized, setIsMinimized]);

  return <SideBar.Provider value={value}>{children}</SideBar.Provider>;
};

export const useSideBar = () => useContext(SideBar);
