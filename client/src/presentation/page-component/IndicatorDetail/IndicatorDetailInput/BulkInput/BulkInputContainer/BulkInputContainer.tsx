import type { FC, ReactNode, SyntheticEvent } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';

interface BulkInputContainerProps {
  openDialog: boolean;
  openSuccessDialog: boolean;
  isLoading: boolean;
  children: ReactNode;
  handleClose: (e: SyntheticEvent<HTMLButtonElement>) => void;
  handleSuccessClose: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const BulkInputContainer: FC<BulkInputContainerProps> = (props) => {
  const {
    children,
    openDialog,
    openSuccessDialog,
    isLoading,
    handleClose,
    handleSuccessClose,
  } = props;

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
      <DialogPopup
        title="Success"
        bodyText="Indikator berhasil diubah"
        buttonText="Ok"
        handleClose={handleSuccessClose}
        handleAccept={handleSuccessClose}
        open={openSuccessDialog}
      />
      <LoadingPopup open={isLoading} />
    </>
  );
};

export default BulkInputContainer;
