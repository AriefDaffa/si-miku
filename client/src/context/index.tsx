import type { FC, ReactNode } from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AuthContextProvider>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </AuthContextProvider>
      </LocalizationProvider>
    </ReactQueryProvider>
  );
};

export default RootProvider;
