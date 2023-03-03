import { useForm } from 'react-hook-form';
import { memo, useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@/components/UI/Grid';
import useInputIndicatorDataMutation from '@/repository/mutation/InputIndicatorDataMutation';
import { DatePickerInput, TextInput } from '@/components/UI/Input';
import type { MajorsNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import type { DataValue } from './types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery/useIndicatorByIdQuery';

interface FormDialogProps {
  open: boolean;
  major: MajorsNormalized;
  setOpenLoading: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
}

const FormDialog: FC<FormDialogProps> = (props) => {
  const { open, major, handleClose, setOpenLoading } = props;
  const params = useParams();

  const { mutate } = useInputIndicatorDataMutation();
  const { refetch } = useIndicatorByIdQuery(params.id || '');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      year_value: 2020,
      target_value: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
    },
  });

  const onSubmit = (data: DataValue) => {
    if (!params.id) {
      return;
    }

    setOpenLoading(true);
    mutate(
      {
        indicator_id: Number(params.id),
        major_id: major.majorId,
        target_value: Number(data.target_value),
        year_value: Number(moment(data.year_value).format('YYYY')),
        q1: Number(data.q1),
        q2: Number(data.q2),
        q3: Number(data.q3),
        q4: Number(data.q4),
      },
      {
        onSuccess: () => {
          refetch().then(() => {
            setOpenLoading(false);
            handleClose();
          });
        },
        onError: () => setOpenLoading(false),
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Input data jurusan {major.majorName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Isi form dibawah untuk menambahkan data indikator pada jurusan{' '}
            <b>{major.majorName}</b>
          </DialogContentText>
          <Grid
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
                name="target_value"
                label="Target"
                type="number"
              />,
              <TextInput
                control={control}
                name="q1"
                label="Q1"
                type="number"
              />,
              <TextInput
                control={control}
                name="q2"
                label="Q2"
                type="number"
              />,
              <TextInput
                control={control}
                name="q3"
                label="Q3"
                type="number"
              />,
              <TextInput
                control={control}
                name="q4"
                label="Q4"
                type="number"
              />,
            ]}
          />
          <DialogContentText>
            *Untuk melakukan input data secara bulk, kunjungi halaman input
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kembali</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default memo(FormDialog);
