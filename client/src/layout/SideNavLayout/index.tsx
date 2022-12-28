import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import { useCustomTheme } from '@/context/CustomThemeContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import { containerCx, pageContainerCx } from './styles';
import Loader from '@/components/Loader';

const SideNavLayout: FC = () => {
  const [open, setOpen] = useState(false);
  const { isDarkTheme } = useCustomTheme();

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <div css={containerCx}>
      <Header onOpenNav={() => setOpen(true)} />
      <Sidebar isOpen={open} onClose={handleOnClose} />
      <div css={pageContainerCx(isDarkTheme)}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavLayout;
