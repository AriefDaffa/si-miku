import { useState } from 'react';
import { useQueryClient } from 'react-query';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';

import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import useDeleteMajorDataMutation from '@/repository/mutation/major/DeleteMajorDataMutation';
import { Header } from '@/presentation/global-component/UI/Typography';
import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';
import type { DeleteMajorDataPayload } from '@/repository/mutation/major/DeleteMajorDataMutation';

interface MajorDeleteDialogProps extends IndicatorMajorsNormalized {
  open: boolean;
  indicatorID: number;
  indicatorName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MajorDeleteDialog: FC<MajorDeleteDialogProps> = (props) => {
  const { open, setOpen, indicatorName, indicatorID, ...rest } = props;

  const [successDialog, setSuccessDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useDeleteMajorDataMutation();

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  const handleDeleteMajor = () => {
    const payload: DeleteMajorDataPayload = {
      department_id: rest.major.departmentID,
      indicator_id: indicatorID,
      major_id: rest.major.majorID,
      year_id: rest.targetMajors[0].targetQuarter.year.yearID,
      target_quarter_id: rest.targetMajors[0].targetQuarter.targetQuarterID,
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);
          setSuccessDialog(true);

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
            <CreateIcon />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <TextWithSubHeader
              header={indicatorName}
              subHeader="Hapus data indikator"
            />
          </Stack>
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

export default MajorDeleteDialog;
