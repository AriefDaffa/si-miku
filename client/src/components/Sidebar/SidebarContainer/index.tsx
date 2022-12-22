import type { FC, ReactNode } from 'react';

import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';

interface SidebarContainerProps {
  openNav: boolean;
  children: ReactNode;
  onCloseNav: () => void;
}

const SidebarContainer: FC<SidebarContainerProps> = (props) => {
  const { openNav, children, onCloseNav } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: 280 },
      }}
    >
      {isDesktop ? (
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

export default SidebarContainer;
