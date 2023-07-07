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
import useDeleteFacultyDataMutation from '@/repository/mutation/faculty/DeleteFacultyDataMutation';
import { Header } from '@/presentation/global-component/UI/Typography';
import { DeleteFacultyDataPayload } from '@/repository/mutation/faculty/DeleteFacultyDataMutation';
import type { IndicatorFacultiesNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface DeleteDialogProps extends IndicatorFacultiesNormalized {
  open: boolean;
  indicatorID: number;
  indicatorName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteDialog: FC<DeleteDialogProps> = (props) => {
  const { open, setOpen, indicatorName, indicatorID, ...rest } = props;

  const [successDialog, setSuccessDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useDeleteFacultyDataMutation();

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  const handleDeleteMajor = () => {
    const payload: DeleteFacultyDataPayload = {
      indicator_id: indicatorID,
      year_id: rest.targetFaculties[0].targetQuarter.year.yearID,
      target_quarter_id: rest.targetFaculties[0].targetQuarter.targetQuarterID,
    };
    setLoading(true);
    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);
          setSuccessDialog(true);
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['indicator', String(indicatorID)],
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
          <Stack
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ my: 1 }}
          >
            <DeleteIcon />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <TextWithSubHeader
              header={indicatorName}
              subHeader="Delete Data Indikator"
            />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Grid
            sm={[12]}
            gridItem={[
              <Stack justifyContent="center" sx={{ mt: 0.5 }}>
                <TextWithSubHeader
                  subHeader="Tahun"
                  header={`${rest.targetFaculties[0].targetQuarter.year.yearValue}`}
                />
              </Stack>,
            ]}
          />
          <Grid
            spacing={2}
            sm={[3, 3, 3, 3]}
            sx={{ mt: 1 }}
            gridItem={[
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Data Kuarter 1"
                  header={`${rest.targetFaculties[0].targetQuarter.q1}`}
                />
              </Stack>,
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Data Kuarter 1"
                  header={`${rest.targetFaculties[0].targetQuarter.q2}`}
                />
              </Stack>,
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Data Kuarter 1"
                  header={`${rest.targetFaculties[0].targetQuarter.q3}`}
                />
              </Stack>,
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Data Kuarter 1"
                  header={`${rest.targetFaculties[0].targetQuarter.q4}`}
                />
              </Stack>,
            ]}
          />
          <Grid
            spacing={2}
            sm={[12]}
            sx={{ mt: 1 }}
            gridItem={[
              <Stack justifyContent="center">
                <TextWithSubHeader
                  subHeader="Data Target"
                  header={`${rest.targetFaculties[0].targetQuarter.targetValue}`}
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

export default DeleteDialog;
