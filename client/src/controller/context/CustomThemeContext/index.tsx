import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import type { FC, ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/styled-engine';

import { GlobalStylesOptions } from '@/presentation/global-component/theme';
import { customTypography } from '@/presentation/global-component/theme/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import ComponentsOverrides from '@/presentation/global-component/theme/override-styles';

interface CustomThemeType {
  isDarkTheme: boolean;
  toggleColorMode: () => void;
}

interface CustomThemeProviderProps {
  children: ReactNode;
}

const CustomTheme = createContext<CustomThemeType>({
  isDarkTheme: false,
  toggleColorMode: () => {},
});

export const CustomThemeProvider: FC<CustomThemeProviderProps> = (props) => {
  const { children } = props;
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = useCallback(() => {
    localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        shape: { borderRadius: 6 },
        palette: {
          mode,
          primary: {
            main: PRIMARY.main,
          },
        },
        typography: customTypography,
      }),
    [mode]
  );

  theme.components = ComponentsOverrides(theme);

  const value: CustomThemeType = useMemo(() => {
    return {
      isDarkTheme: mode === 'dark',
      toggleColorMode,
    };
  }, [mode, toggleColorMode]);

  useEffect(() => {
    const existingPreference = localStorage.getItem('theme');
    if (existingPreference) {
      existingPreference === 'light' ? setMode('light') : setMode('dark');
    } else {
      setMode('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <CustomTheme.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={GlobalStylesOptions} />
        {children}
      </ThemeProvider>
    </CustomTheme.Provider>
  );
};

export const useCustomTheme = () => useContext(CustomTheme);
