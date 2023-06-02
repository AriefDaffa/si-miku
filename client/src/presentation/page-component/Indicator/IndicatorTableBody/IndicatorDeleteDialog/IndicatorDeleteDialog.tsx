import { useState } from 'react';
import { useQueryClient } from 'react-query';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import Grid from '@/presentation/global-component/UI/Grid/Grid';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle/AvatarTitle';
import useDeleteIndicatorMutation from '@/repository/mutation/indicator/DeleteIndicatorMutation';
import { Header } from '@/presentation/global-component/UI/Typography';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

interface IndicatorDeleteDialogProps extends IndicatorListNormalized {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const IndicatorDeleteDialog: FC<IndicatorDeleteDialogProps> = (props) => {
  const { open, setOpen, ...rest } = props;

  const [successDialog, setSuccessDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useDeleteIndicatorMutation();

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  const handleDeleteMajor = () => {
    setLoading(true);
    mutate(rest.indicatorID, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);
          setOpen(false);
          setSuccessDialog(true);

          queryClient.invalidateQueries({
            queryKey: 'indicator-list',
          });
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Grid
            sm={[12]}
            gridItem={[
              <AvatarTitle
                isImageIcon
                imageURL=""
                Icon={DeleteIcon}
                subHeader="Hapus"
                header="Indikator"
              />,
            ]}
          />
          <Divider sx={{ my: 2 }} />
          <Grid
            sm={[6, 6]}
            gridItem={[
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Kode Indikator"
                  header={`${rest.indicatorCode}`}
                />
              </Stack>,
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Supervisor Indikator"
                  header={`${rest.supervisedBy}`}
                />
              </Stack>,
              <Stack justifyContent="end" sx={{ height: '100%' }}>
                <TextWithSubHeader
                  subHeader="Nama Indikator"
                  header={`${rest.indicatorName}`}
                />
              </Stack>,
            ]}
          />
          <Divider sx={{ my: 2 }} />
          <Header text="Apakah anda yakin ingin menghapus data tersebut?" />
          <Button
            onClick={handleDeleteMajor}
            variant="contained"
            color="error"
            sx={{ mt: 2, float: 'right' }}
          >
            Hapus
          </Button>
        </DialogContent>
      </Dialog>
      <DialogPopup
        title="Success"
        bodyText="Data berhasil dihapus"
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </>
  );
};

export default IndicatorDeleteDialog;
