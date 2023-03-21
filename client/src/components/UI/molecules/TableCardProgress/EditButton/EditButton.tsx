import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@/components/UI/atoms/Grid';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { SubHeader } from '@/components/UI/atoms/Typography';
import { useUpdateIndicatorMutation } from '@/repository/mutation/UpdateIndicatorMutation';

interface EditButtonProps {
  id: number;
  indicatorCode: string;
  indicatorName: string;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const EditButton: FC<EditButtonProps> = (props) => {
  const { id, indicatorCode, indicatorName, setSelected } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      indicator_code: indicatorCode,
      indicator_name: indicatorName,
    },
  });

  const { mutate } = useUpdateIndicatorMutation();
  const { refetch } = useIndicatorQuery(true);

  const handleOnClick = (data: {
    indicator_name: string;
    indicator_code: string;
  }) => {
    const splittedCode = data.indicator_code
      .split('.')
      .filter((item: any) => /\S/.test(item));
    let validated = true;

    // validate indicator_code
    for (let i = 0; i < splittedCode.length; i++) {
      const numberedValue = Number(splittedCode[i]);

      if (isNaN(numberedValue)) {
        validated = false;
        setLocalError('Error! Format input tidak valid');
        break;
      }
    }

    if (validated) {
      setOpenDialog(false);
      setLoading(true);
      mutate(
        { id, data },
        {
          onSuccess: () =>
            refetch().then(() => {
              setLoading(false);
              setSuccessDialog(true);
              setSelected([]);
            }),
          onError: () => setLoading(false),
        }
      );
    }
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
                  <Controller
                    name="indicator_code"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Kode Indikator" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="text"
                          error={
                            fieldState.error || localError !== '' ? true : false
                          }
                          helperText={fieldState.error?.message || localError}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="indicator_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Nama Indikator" sx={{ pb: 1 }} />
                        <TextField
                          fullWidth
                          type="text"
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  // <TextInput
                  //   control={control}
                  //   label=""
                  //   labelInside="Kode Indikator"
                  //   name={`indicator_code`}
                  //   type="text"
                  // />,
                  // <TextInput
                  //   control={control}
                  //   label=""
                  //   labelInside="Nama Indikator"
                  //   name={`indicator_name`}
                  //   type="text"
                  // />,
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
