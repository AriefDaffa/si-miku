import type { FC, ReactNode } from 'react';

import { AuthContextProvider } from './AuthContext';
import { CustomThemeProvider } from './CustomThemeContext';
import ReactQueryProvider from './ReactQueryContext';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = (props) => {
  const { children } = props;

  return (
    <ReactQueryProvider>
      <AuthContextProvider>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </AuthContextProvider>
    </ReactQueryProvider>
  );
};

export default RootProvider;
