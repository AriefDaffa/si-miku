import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Grid from '@/components/UI/atoms/Grid';
import FormInput from './FormInput';

interface InputDataIndikatorProps {
  indicatorID: number;
}

const InputDataIndikator: FC<InputDataIndikatorProps> = (props) => {
  const { indicatorID } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Input Data Indikator
      </Button>
      <Dialog fullWidth maxWidth="lg" open={openDialog} onClose={handleClose}>
        <DialogTitle>Tambah data indikator</DialogTitle>
        <DialogContent>
          <Grid gridItem={[<FormInput indicatorID={indicatorID} />]} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InputDataIndikator;
