import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import EventNoteIcon from '@mui/icons-material/EventNote';

import useAuthStatusQuery from '@/repository/query/auth/AuthStatusQuery';
import {
  NAV_ITEM,
  NAV_ITEM_SECONDARY,
} from '@/controller/constant/sidebar-menu';
import { useAuthContext } from '@/controller/context/AuthContext';
import type { CurrentUserResponseNormalized } from '@/repository/query/user/CurrentUserQuery/types';

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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <List disablePadding sx={{ p: 1 }}>
          <LogoutButton />
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
