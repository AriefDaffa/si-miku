import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
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
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

import Grid from '@/components/UI/atoms/Grid';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { SubHeader } from '@/components/UI/atoms/Typography';
import { useUpdateIndicatorMutation } from '@/repository/mutation/indicator/UpdateIndicatorMutation';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface EditButtonProps {
  open: boolean;
  item: IndicatorListNormalized;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditButton: FC<EditButtonProps> = (props) => {
  const { item, open, setOpen } = props;
  const { indicatorID, indicatorCode, indicatorName } = item;

  // const [openDialog, setOpenDialog] = useState(false);
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
  const queryClient = useQueryClient();

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
      setOpen(false);
      setLoading(true);
      mutate(
        { id: indicatorID, data },
        {
          onSuccess: (res) => {
            if (res.status >= 400) {
              throw res.data.message;
            } else {
              // setSuccessDialog(true);
              setLoading(false);
              queryClient.invalidateQueries('indicator-list');
            }
          },
          onError: () => setLoading(false),
        }
      );
    }
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  return (
    <>
      <Dialog
        open={open}
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
              // color={`${PRIMARY.main}`}
              size="large"
              type="submit"
              variant="contained"
              // disabled={isLoading}
              sx={{
                float: 'right',
                mt: 2,
                backgroundColor: PRIMARY.main,
                ':hover': { backgroundColor: PRIMARY.light },
              }}
            >
              {false ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </DialogContent>
        {/* <DialogActions></DialogActions> */}
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
