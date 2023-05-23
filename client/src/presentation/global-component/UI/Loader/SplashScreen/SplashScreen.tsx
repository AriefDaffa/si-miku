import type { FC } from 'react';
// import logo from '@/assets/logo-gifs/logo.gif';

import { SplashScreenContainerCx } from './styles';

const SplashScreen: FC = () => {
  return (
    <div css={SplashScreenContainerCx}>{/* <img src={logo} alt="" /> */}</div>
  );
};

export default SplashScreen;
