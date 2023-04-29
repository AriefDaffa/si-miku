import type { FC, SyntheticEvent } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingPopupProps {
  open: boolean;
  handleClose?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const LoadingPopup: FC<LoadingPopupProps> = (props) => {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingPopup;
