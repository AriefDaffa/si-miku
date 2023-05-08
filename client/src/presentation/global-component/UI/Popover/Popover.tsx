import { SetStateAction, useState } from 'react';
import type { FC, ReactNode, Dispatch } from 'react';

import { Popover as MuiPopover } from '@mui/material';
import type { PopoverOrigin } from '@mui/material/Popover';

import { GREY } from '@/presentation/global-component/theme/Colors';

interface PopoverProps {
  openThreedots: any;
  children: ReactNode;
  setOpenThreedots: Dispatch<SetStateAction<any>>;
  isFullWidth?: boolean;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

const Popover: FC<PopoverProps> = (props) => {
  const {
    openThreedots,
    children,
    setOpenThreedots,
    isFullWidth = false,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    transformOrigin = { vertical: 'top', horizontal: 'right' },
  } = props;

  const handleCloseMenu = () => {
    setOpenThreedots(null);
  };

  return (
    <MuiPopover
      open={Boolean(openThreedots)}
      anchorEl={openThreedots}
      onClose={handleCloseMenu}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: isFullWidth ? '100%' : 'fit-content',
          maxWidth: '340px',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      {children}
    </MuiPopover>
  );
};

export default Popover;
