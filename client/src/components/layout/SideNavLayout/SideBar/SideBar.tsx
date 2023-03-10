import type { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import useAuthStatusQuery from '@/repository/query/AuthStatusQuery';
import { NAV_ITEM, NAV_ITEM_SECONDARY } from '@/constant/sidebar-menu';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

import UserProfileCard from './UserProfileCard';
import SidebarItem from './SidebarItem';
import LogoSection from './LogoSection';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  isLoading: boolean;
  data: CurrentUserResponseNormalized;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const { data, isLoading, onClose } = props;

  const { isManagement } = useAuthContext();

  return (
    <>
      <LogoSection />
      <UserProfileCard data={data} isLoading={isLoading} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Divider />
        <List disablePadding sx={{ p: 1 }}>
          {NAV_ITEM.filter((item) =>
            isManagement === true ? item : item.isManagementOnly === false
          ).map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              path={item.path}
              Icon={item.Icon}
              onCloseNav={onClose}
            />
          ))}
        </List>
        <Divider />
        <List disablePadding sx={{ p: 1 }}>
          {NAV_ITEM_SECONDARY.filter((item) =>
            isManagement === true ? item : item.isManagementOnly === false
          ).map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              path={item.path}
              Icon={item.Icon}
              onCloseNav={onClose}
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
    </>
  );
};

export default Sidebar;
