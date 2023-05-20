import { useState, useCallback } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import type { FC } from 'react';

import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCustomTheme } from '@/controller/context/CustomThemeContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { useCurrentUserQuery } from '@/repository/query/user/CurrentUserQuery';
import PageContainer from '@/presentation/page-component/common/PageContainer';

import NavBar from './NavBar';
import SideBar from './SideBar';
import SideMenuSwitcher from './SideMenuSwitcher';
import { containerCx, pageContainerCx } from './styles';

interface ContextType {
  year: string;
}

const SideNavLayout: FC = () => {
  const [open, setOpen] = useState(false);

  const { isDarkTheme } = useCustomTheme();
  const { currentYear, handleSelectYear } = useCurrentYear();
  const { headline } = useHeadline();
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
      <SideMenuSwitcher openNav={open} onCloseNav={handleOnClose}>
        <SideBar
          isOpen={open}
          onClose={handleOnClose}
          data={data}
          isLoading={isLoading}
        />
      </SideMenuSwitcher>
      <div css={pageContainerCx(isDarkTheme)}>
        <PageContainer
          title={headline.title}
          subTitle={headline.subTitle}
          enableYearPicker={headline.isYearPickerEnabled}
          yearValue={currentYear}
          handleSelectYear={handleSelectYear}
        >
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
};

export const useYear = () => {
  return useOutletContext<ContextType>();
};

export default SideNavLayout;
