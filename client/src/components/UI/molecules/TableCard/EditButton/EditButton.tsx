import * as yup from 'yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from '@mui/x-date-pickers';

import Grid from '@/components/UI/atoms/Grid';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { useUpdateIndicatorMutation } from '@/repository/mutation/UpdateIndicatorMutation';
import { useYupValidationResolver } from '@/hooks/use-yup-validation-resolver';
import type { TargetQuartersNormalized } from '@/repository/query/IndicatorByIdQuery';

interface EditButtonProps {
  item: TargetQuartersNormalized;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const EditButton: FC<EditButtonProps> = (props) => {
  const { item, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    year_value: yup.date().required('Tahun tidak boleh kosong'),
    q1: yup.number().required('Field tidak boleh kosong!'),
    q2: yup.number().required('Field tidak boleh kosong!'),
    q3: yup.number().required('Field tidak boleh kosong!'),
    q4: yup.number().required('Field tidak boleh kosong!'),
    target_value: yup.number().required('Target tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      year_value: item.yearValue,
      q1: item.q1,
      q2: item.q2,
      q3: item.q3,
      q4: item.q4,
      target_value: item.targetValue,
    },
    resolver,
  });

  const { mutate } = useUpdateIndicatorMutation();
  const { refetch } = useIndicatorQuery(true);

  const handleOnClick = (data: {
    indicator_name: string;
    indicator_code: string;
  }) => {
    setOpenDialog(false);
    // setLoading(true);
    // mutate(
    //   { id, data },
    //   {
    //     onSuccess: () =>
    //       refetch().then(() => {
    //         setLoading(false);
    //         setSuccessDialog(true);
    //         setSelected([]);
    //       }),
    //     onError: () => setLoading(false),
    //   }
    // );
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
      <IconButton sx={{ p: 0, mr: 1 }} onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Edit data indikator</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleOnClick)}>
            <Box>
              <Grid
                spacing={2}
                gridItem={[
                  <Grid
                    spacing={2}
                    sm={[6, 6, 3, 3, 3, 3, 6]}
                    gridItem={[
                      <Controller
                        name="year_value"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <DatePicker
                            label="Tahun"
                            views={['year']}
                            openTo={'year'}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                error={fieldState.error ? true : false}
                                helperText={fieldState.error?.message}
                                {...params}
                              />
                            )}
                            {...field}
                          />
                        )}
                      />,
                      <Controller
                        name="target_value"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="number"
                            error={fieldState.error ? true : false}
                            label={'Target'}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />,
                      <Controller
                        name="q1"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="number"
                            error={fieldState.error ? true : false}
                            label={'Q1'}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />,
                      <Controller
                        name="q2"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="number"
                            error={fieldState.error ? true : false}
                            label={'Q2'}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />,
                      <Controller
                        name="q3"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="number"
                            error={fieldState.error ? true : false}
                            label={'Q3'}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />,
                      <Controller
                        name="q4"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="number"
                            error={fieldState.error ? true : false}
                            label={'Q4'}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />,
                    ]}
                  />,
                ]}
              />
            </Box>
            <Button
              color="primary"
              size="large"
              type="submit"
              // disabled={isLoading}
              sx={{ float: 'right', mt: 2 }}
            >
              {false ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <DialogPopup
        title="Success"
        bodyText="Indikator berhasil diubah"
        buttonText="Ok"
        handleClose={handleMessageClose}
        handleAccept={handleMessageClose}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </>
  );
};

export default EditButton;
