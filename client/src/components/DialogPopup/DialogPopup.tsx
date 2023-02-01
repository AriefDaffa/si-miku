import type { FC } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogPopupProps {
  open: boolean;
  title: string;
  bodyText: string;
  buttonText: string;
  handleAccept: () => void;
  handleClose: () => void;
}

const DialogPopup: FC<DialogPopupProps> = (props) => {
  const { open, handleClose, handleAccept, title, bodyText, buttonText } =
    props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {bodyText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPopup;
