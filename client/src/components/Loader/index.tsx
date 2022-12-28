import type { FC } from 'react';

import { useCustomTheme } from '@/context/CustomThemeContext';
import logoLight from '@/assets/logo-gifs/logo-light.gif';
import logoDark from '@/assets/logo-gifs/logo-dark.gif';

import { loaderContainerCx } from './styles';

const Loader: FC = () => {
  const { isDarkTheme } = useCustomTheme();

  console.log('## isDarkTheme', isDarkTheme);

  return (
    <div css={loaderContainerCx(isDarkTheme)}>
      {isDarkTheme ? (
        <img src={logoDark} alt="" />
      ) : (
        <img src={logoLight} alt="" />
      )}
    </div>
  );
};

export default Loader;
