import type { FC } from 'react';

import { Box, List } from '@mui/material';

import SidebarContainer from './SidebarContainer';
import UserProfileCard from './UserProfileCard';
import SidebarItem from './SidebarItem';
import LogoSection from './LogoSection';

import { NAV_ITEM, LOGOUT_ITEM } from './menu-item';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <SidebarContainer openNav={isOpen} onCloseNav={onClose}>
      <LogoSection />
      <UserProfileCard url="" />
      <Box sx={{ flex: 1 }}>
        <List disablePadding sx={{ p: 1 }}>
          {NAV_ITEM.map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              path={item.path}
              Icon={item.Icon}
            />
          ))}
        </List>
      </Box>
      <Box>
        <List disablePadding sx={{ p: 1 }}>
          <SidebarItem
            title={LOGOUT_ITEM.title}
            path={LOGOUT_ITEM.path}
            Icon={LOGOUT_ITEM.Icon}
          />
        </List>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;
