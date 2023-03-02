import type { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import { NAV_ITEM } from '@/routes/sidebar-menu';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

import UserProfileCard from './UserProfileCard';
import SidebarItem from './SidebarItem';
import LogoSection from './LogoSection';
import LogoutButton from './LogoutButton';

interface SidebarProps {
  isOpen: boolean;
  isLoading: boolean;
  data: CurrentUserResponseNormalized;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const { data, isLoading, onClose } = props;

  return (
    <>
      <LogoSection />
      <UserProfileCard data={data} isLoading={isLoading} />
      <Box sx={{ flex: 1 }}>
        <List disablePadding sx={{ p: 1 }}>
          {NAV_ITEM.map((item, idx) => (
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
