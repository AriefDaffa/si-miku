import * as yup from 'yup';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@/presentation/global-component/UI/Grid';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import { useUpdateIndicatorMutation } from '@/repository/mutation/indicator/UpdateIndicatorMutation';
import { updateIndicatorPayload } from '@/repository/mutation/indicator/UpdateIndicatorMutation/types';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

import type { IndicatorEditSubmitPayload } from './types';

interface IndicatorEditDialogProps extends IndicatorListNormalized {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const IndicatorEditDialog: FC<IndicatorEditDialogProps> = (props) => {
  const { open, setOpen, ...rest } = props;

  const schema = yup.object().shape({
    indicator_name: yup
      .string()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    indicator_code: yup
      .string()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } = useUpdateIndicatorMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      indicator_name: rest.indicatorName,
      indicator_code: rest.indicatorCode,
      supervised_by: rest.supervisedBy,
    },
    resolver,
  });

  const handleOnSubmit = (data: IndicatorEditSubmitPayload) => {
    const { indicator_code, indicator_name, supervised_by } = data;
    const payload: updateIndicatorPayload = {
      id: rest.indicatorID,
      indicator_code,
      indicator_name,
      supervised_by,
    };

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);
          queryClient.invalidateQueries({
            queryKey: 'indicator-list',
          });
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
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
        <DialogContent>
          <Grid
            sm={[12]}
            gridItem={[
              <AvatarTitle
                isImageIcon
                imageURL=""
                Icon={EditIcon}
                subHeader="Edit"
                header="Informasi Indikator"
              />,
            ]}
          />
          <Divider sx={{ my: 2 }} />
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack gap={2} sx={{ my: 2 }}>
              <Grid
                spacing={2}
                sm={[6, 6, 12]}
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
                          error={fieldState.error ? true : false}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      </Box>
                    )}
                  />,
                  <Controller
                    name="supervised_by"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <SubHeader text="Supervisor Indikator" sx={{ pb: 1 }} />
                        <Select autoWidth label="" fullWidth {...field}>
                          <MenuItem value={'1'}>Wakil Dekan I</MenuItem>
                          <MenuItem value={'2'}>Wakil Dekan II</MenuItem>
                          <MenuItem value={'3'}>Wakil Dekan III</MenuItem>
                        </Select>
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
                ]}
              />

              {isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {String(error || '')}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Success! Data berhasil diubah
                </Alert>
              )}
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  float: 'right',
                  mt: 2,
                  backgroundColor: PRIMARY.main,
                  ':hover': { backgroundColor: PRIMARY.light },
                }}
              >
                {false ? 'Loading...' : 'Submit'}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <LoadingPopup open={loading} />
    </>
  );
};

export default IndicatorEditDialog;
