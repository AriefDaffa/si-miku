import { useForm } from 'react-hook-form';
import { memo, useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import CustomGrid from '@/components/UI/CustomGrid';
import type { MajorOverviewNormalized } from '@/repository/query/MajorQuery/types';

interface DropdownDialogProps {
  open: boolean;
  handleClose: () => void;
  major: MajorOverviewNormalized[];
}

const DropdownDialog: FC<DropdownDialogProps> = (props) => {
  const { open, major, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle>Input data jurusan {major.majorName}</DialogTitle> */}
      <DialogContent>
        <DialogContentText>Pilih jurusan dibawah ini</DialogContentText>
        <CustomGrid
          sx={{ mt: 2, mb: 3 }}
          gridItem={[
            <FormControl>
              {major.length !== 0 && (
                <Select autoWidth defaultValue={major[1].majorID}>
                  {major.map((item, idx) => (
                    <MenuItem key={idx} value={item.majorID}>
                      {item.majorName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>,
          ]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kembali</Button>
        <Button type="submit">Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DropdownDialog);
