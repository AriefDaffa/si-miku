import { useState } from 'react';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogPopup from '@/components/UI/atoms/DialogPopup';
import useDeleteIndicatorMutation from '@/repository/mutation/DeleteIndicatorMutation';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';

interface DeleteButtonProps {
  id: number;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
  const { id, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useDeleteIndicatorMutation();
  const { refetch } = useIndicatorQuery(true);

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);
    mutate([id], {
      onSuccess: () =>
        refetch().then(() => {
          setLoading(false);
          setSuccessDialog(true);
          setSelected([]);
        }),
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
      <DialogPopup
        title="Success"
        bodyText="Indikator berhasil dihapus"
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </>
  );
};

export default DeleteButton;
