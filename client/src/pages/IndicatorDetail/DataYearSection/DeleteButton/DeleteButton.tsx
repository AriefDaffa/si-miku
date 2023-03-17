import { useState } from 'react';
import { useQueryClient } from 'react-query';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useDeleteIndicatorDataMutation from '@/repository/mutation/DeleteIndicatorDataMutation';
import type { TargetQuarterNormalized } from '@/repository/query/IndicatorByIdQuery';
import type { SelectedPropTypes } from '../types';

interface DeleteButtonProps {
  indicatorID: number;
  data: TargetQuarterNormalized;
  setSelected: Dispatch<SetStateAction<SelectedPropTypes[]>>;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
  const { data, indicatorID, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useDeleteIndicatorDataMutation();
  const queryClient = useQueryClient();

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);

    mutate(
      [
        {
          indicator_id: indicatorID,
          year_id: data.yearID,
          target_quarter_id: data.targetQuarterID,
        },
      ],
      {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setSelected([]);
            setLoading(false);
          }

          queryClient.invalidateQueries(['indicator', String(indicatorID)]);
        },
        onError: () => setLoading(false),
      }
    );
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
