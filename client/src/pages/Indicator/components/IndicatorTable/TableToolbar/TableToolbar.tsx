import { useState } from 'react';
import { debounce } from 'lodash';
import { useQueryClient } from 'react-query';
import type {
  FC,
  ChangeEvent,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import useDeleteIndicatorMutation from '@/repository/mutation/DeleteIndicatorMutation';
import { SubHeader } from '@/components/UI/atoms/Typography';

interface TableToolbarProps {
  totalSelected: number;
  selectedData: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const { totalSelected, selectedData, handleKeywordChange, setSelected } =
    props;

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutate } = useDeleteIndicatorMutation();

  const handleOnclick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDialog(false);
    setLoading(true);
    mutate(selectedData, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setSuccessDialog(true);
          setLoading(false);
          setSelected([]);
        }

        queryClient.invalidateQueries('indicator-list');
      },
      onError: () => {
        setLoading(false);
      },
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

  // dialog handler
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction={{ sm: 'row' }} flexBasis="auto" sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Cari Indikator"
            onChange={debounce(handleKeywordChange, 600)}
            // sx={{ flexGrow }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ width: '100%' }}
        >
          {selectedData.length > 0 ? (
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpen}
                sx={{ float: 'right', zIndex: 40 }}
              >
                Delete Bulk
              </Button>
              <SubHeader
                text={`Selected ${totalSelected} indicator`}
                sx={{ ml: 1 }}
              />
            </Box>
          ) : null}
        </Stack>
      </Stack>
      <DialogPopup
        title="Hapus Bulk Indikator"
        bodyText={`Apakah anda yakin ingin menghapus ${totalSelected} indikator?`}
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

export default TableToolbar;
