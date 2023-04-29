import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

import { useSideBar } from '@/controller/context/SideBarContext';
import type { CurrentUserResponseNormalized } from '@/repository/query/CurrentUserQuery/types';

interface SideMenuSwitcherProps {
  openNav: boolean;
  children: ReactNode;
  onCloseNav: () => void;
}

const SideMenuSwitcher: FC<SideMenuSwitcherProps> = (props) => {
  const { openNav, onCloseNav, children } = props;

  const { isMinimized, setIsMinimized } = useSideBar();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (!isDesktop) {
      setIsMinimized(false);
    }
  }, [isDesktop]);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: isMinimized ? 80 : 280 },
        transition: 'all 0.5s',
      }}
    >
      {isDesktop ? (
        isMinimized ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: 80,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
                display: 'flex',
                flexDirection: 'col',
                justifyContent: 'center',
              },
            }}
          >
            {children}
          </Drawer>
        ) : (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: 280,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
                display: 'flex',
                flexDirection: 'col',
                justifyContent: 'center',
              },
            }}
          >
            {children}
          </Drawer>
        )
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: 280,
              display: 'flex',
              flexDirection: 'col',
              justifyContent: 'center',
            },
          }}
        >
          {children}
        </Drawer>
      )}
    </Box>
  );
};

export default SideMenuSwitcher;
