import { HelmetProvider } from 'react-helmet-async';
import type { FC, ReactNode } from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AuthContextProvider } from './AuthContext';
import { CustomThemeProvider } from './CustomThemeContext';
import { SideBarProvider } from './SideBarContext';
import { CurrentYearProvider } from './CurrentYearContext';
import ReactQueryProvider from './ReactQueryContext';
import { HeadlineProvider } from './HeadlineContext';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = (props) => {
  const { children } = props;

  return (
    <ReactQueryProvider>
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <AuthContextProvider>
            <CustomThemeProvider>
              <SideBarProvider>
                <HeadlineProvider>
                  <CurrentYearProvider>{children}</CurrentYearProvider>
                </HeadlineProvider>
              </SideBarProvider>
            </CustomThemeProvider>
          </AuthContextProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </ReactQueryProvider>
  );
};

export default RootProvider;
