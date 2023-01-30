import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';
import { useCustomTheme } from '@/context/CustomThemeContext';

import { containerCx, pageContainerCx } from './styles';
import NavBar from './NavBar';
import Sidebar from './SideBar';

const SideNavLayout: FC = () => {
  const [open, setOpen] = useState(false);
  const { isDarkTheme } = useCustomTheme();
  const { data, isLoading } = useCurrentUserQuery();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOpenNav = () => {
    setOpen(true);
  };

  return (
    <div css={containerCx}>
      <NavBar onOpenNav={handleOpenNav} />
      <Sidebar
        isOpen={open}
        onClose={handleOnClose}
        data={data}
        isLoading={isLoading}
      />
      <div css={pageContainerCx(isDarkTheme)}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavLayout;
