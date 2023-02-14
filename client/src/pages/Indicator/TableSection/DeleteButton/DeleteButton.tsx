import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogPopup from '@/components/DialogPopup';
import useDeleteIndicatorMutation from '@/repository/mutation/DeleteIndicatorMutation';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import LoadingPopup from '@/components/Loader/LoadingPopup';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
  const { id } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate, isLoading } = useDeleteIndicatorMutation();
  const { refetch } = useIndicatorQuery();

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);
    mutate(id, {
      onSuccess: () => refetch().then(() => setLoading(false)),
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

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <DialogPopup
        title="Hapus Indikator"
        bodyText="Apakah anda yakin ingin menghapus indikator tersebut?"
        buttonText="Hapus"
        handleClose={handleClose}
        handleAccept={handleOnclick}
        open={openDialog}
      />
      <LoadingPopup open={loading} />
    </>
  );
};

export default DeleteButton;
