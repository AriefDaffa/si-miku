import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import { useCustomTheme } from '@/context/CustomThemeContext';

import { useAuthContext } from '@/context/AuthContext';

import NavBar from './NavBar';
import SideBar from './SideBar';
import SideMenuSwitcher from './SideMenuSwitcher';
import { containerCx, pageContainerCx } from './styles';

const SideNavLayout: FC = () => {
  const [open, setOpen] = useState(false);

  const { isDarkTheme } = useCustomTheme();
  const { user, isLoading } = useAuthContext();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOpenNav = () => {
    setOpen(true);
  };

  return (
    <div css={containerCx}>
      <NavBar onOpenNav={handleOpenNav} />
      <SideMenuSwitcher openNav={open} onCloseNav={handleOnClose}>
        <SideBar
          isOpen={open}
          onClose={handleOnClose}
          data={user}
          isLoading={isLoading}
        />
      </SideMenuSwitcher>
      <div css={pageContainerCx(isDarkTheme)}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavLayout;
