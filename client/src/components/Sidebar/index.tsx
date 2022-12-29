import type { FC } from 'react';

import { Box, List, Divider } from '@mui/material';

import SidebarContainer from './SidebarContainer';
import UserProfileCard from './UserProfileCard';
import SidebarItem from './SidebarItem';
import LogoSection from './LogoSection';
import LogoutButton from './LogoutButton';

import { NAV_ITEM } from './menu-item';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <SidebarContainer openNav={isOpen} onCloseNav={onClose}>
      <LogoSection />
      <UserProfileCard url="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
      <Divider />
      <Box>
        <List disablePadding>
          <LogoutButton />
        </List>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;
