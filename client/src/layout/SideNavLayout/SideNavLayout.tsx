import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';
import { useCustomTheme } from '@/context/CustomThemeContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import { containerCx, pageContainerCx } from './styles';

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
      <Header onOpenNav={handleOpenNav} />
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
