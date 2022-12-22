import type { FC, ReactNode } from 'react';

import { CustomThemeProvider } from './CustomThemeContext';
import ReactQueryProvider from './ReactQueryContext';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = (props) => {
  const { children } = props;

  return (
    <ReactQueryProvider>
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </ReactQueryProvider>
  );
};

export default RootProvider;
