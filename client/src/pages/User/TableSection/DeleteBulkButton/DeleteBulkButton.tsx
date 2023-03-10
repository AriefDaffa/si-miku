import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useDeleteUserMutation from '@/repository/mutation/DeleteUserMutation';
import useUserQuery from '@/repository/query/UserQuery';

interface DeleteBulkButtonProps {
  selectedData: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const DeleteBulkButton: FC<DeleteBulkButtonProps> = (props) => {
  const { selectedData, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useDeleteUserMutation();
  const { refetch } = useUserQuery(2, true);

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);
    mutate(selectedData, {
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
