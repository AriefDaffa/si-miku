import type { FC } from 'react';

import { useCustomTheme } from '@/context/CustomThemeContext';
import logoLight from '@/assets/logo-gifs/logo-light.gif';
import logoDark from '@/assets/logo-gifs/logo-dark.gif';

import { SplashScreenContainerCx } from './styles';

const SplashScreen: FC = () => {
  const { isDarkTheme } = useCustomTheme();

  return (
    <div css={SplashScreenContainerCx(isDarkTheme)}>
      {isDarkTheme ? (
        <img src={logoDark} alt="" />
      ) : (
        <img src={logoLight} alt="" />
      )}
    </div>
  );
};

export default SplashScreen;
