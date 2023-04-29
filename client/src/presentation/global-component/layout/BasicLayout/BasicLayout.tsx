import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import NavBar from './NavBar';
import { pageContainerCx, containerCx } from './styles';

interface BasicLayoutProps {}

const BasicLayout: FC<BasicLayoutProps> = () => {
  return (
    <div css={containerCx}>
      <NavBar />
      <div css={pageContainerCx}>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
