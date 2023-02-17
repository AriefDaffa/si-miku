import { useForm } from 'react-hook-form';
import { memo, useState } from 'react';
import type { FC } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import type { MajorsNormalized } from '@/repository/query/IndicatorByIdQuery/types';
import CustomGrid from '@/components/CustomGrid';
import { DatePickerInput, TextInput } from '@/components/Input';

interface FormDialogProps {
  open: boolean;
  major: MajorsNormalized;
  handleClose: () => void;
}

const FormDialog: FC<FormDialogProps> = (props) => {
  const { open, major, handleClose } = props;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      year_value: 2020,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target: 0,
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Input data jurusan {major.majorName}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Isi form dibawah untuk menambahkan data indikator pada jurusan{' '}
          <b>{major.majorName}</b>
        </DialogContentText>
        <CustomGrid
          sx={{ mt: 2, mb: 3 }}
          sm={[6, 6, 3, 3, 3, 3]}
          gridItem={[
            <DatePickerInput
              control={control}
              name="year_value"
              label="Tahun"
              isYearOnly
            />,
            <TextInput
              control={control}
              name="target"
              label="Target"
              type="string"
            />,
            <TextInput control={control} name="q1" label="Q1" type="string" />,
            <TextInput control={control} name="q2" label="Q2" type="string" />,
            <TextInput control={control} name="q3" label="Q3" type="string" />,
            <TextInput control={control} name="q4" label="Q4" type="string" />,
          ]}
        />
        <DialogContentText>
          *Untuk melakukan input data secara bulk, kunjungi halaman input
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kembali</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(FormDialog);
