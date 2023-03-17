import { useQueryClient } from 'react-query';
import { useState } from 'react';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useDeleteIndicatorDataMutation from '@/repository/mutation/DeleteIndicatorDataMutation';
import type { SelectedPropTypes } from '../types';

interface DeleteBulkButtonProps {
  indicatorID: number;
  selectedData: SelectedPropTypes[];
  setSelected: Dispatch<SetStateAction<SelectedPropTypes[]>>;
}

const DeleteBulkButton: FC<DeleteBulkButtonProps> = (props) => {
  const { indicatorID, selectedData, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate, isLoading } = useDeleteIndicatorDataMutation();
  const queryClient = useQueryClient();

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);
    mutate(selectedData, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);
          setSuccessDialog(true);
          setSelected([]);
        }

        queryClient.invalidateQueries(['indicator', String(indicatorID)]);
      },
      onError: () => setLoading(false),
    });
  };

  const handleOpen = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  return (
    <Box>
      <Button
        color="error"
        variant="contained"
        disabled={!selectedData.length}
        onClick={handleOpen}
      >
        Delete Bulk
      </Button>
      <DialogPopup
        title="Hapus Bulk Indikator"
        bodyText={`Apakah anda yakin ingin menghapus ${selectedData.length} indikator?`}
        buttonText="Hapus"
        handleClose={handleClose}
        handleAccept={handleOnclick}
        open={openDialog}
      />
      <DialogPopup
        title="Success"
        bodyText={`Indikator berhasil dihapus`}
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </Box>
  );
};

export default DeleteBulkButton;
