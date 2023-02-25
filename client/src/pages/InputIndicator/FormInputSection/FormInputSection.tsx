import { useFieldArray, useForm } from 'react-hook-form';
import { split } from 'lodash';
import { useState } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import LoadingPopup from '@/components/Loader/LoadingPopup';
import { Header, SubHeader } from '@/components/Typography';
import { TextInput } from '@/components/Input';

import IndicatorCodeInput from './IndicatorCodeInput';

import { defaultValues } from './constant';
import type { DefaultValueTypes } from './types';
import DialogPopup from '@/components/DialogPopup';

const FormInputSection: FC = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const { mutate, isLoading } = useInputIndicatorMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `indicator`,
  });

  const handleOnUpload = (data: DefaultValueTypes) => {
    setOpenLoading(true);

    mutate(
      {
        indicator: data.indicator.map((item) => {
          return {
            indicator_code: split(item.indicator_code, '.')
              .filter((n) => n !== ' ')
              .join('.'),
            indicator_name: item.indicator_name,
          };
        }),
      },
      {
        onSuccess: () => {
          setOpenLoading(false), setOpenDialog(true);
        },
        onError: () => setOpenLoading(false),
      }
    );
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const addSection = () => {
    append({ indicator_code: '', indicator_name: '' });
  };

  return (
    <CustomGrid
      gridItem={[
        <CustomCard>
          <Header text="Form Input" />
          <SubHeader text="Input indikator baru melalui form dibawah ini" />
          <Divider sx={{ mt: 2, mb: 2 }} />
          <form onSubmit={handleSubmit(handleOnUpload)}>
            <CustomGrid
              sx={{ mb: 2 }}
              spacing={1}
              gridItem={[
                fields.map((item, idx) => (
                  <Box key={item.id}>
                    <Stack
                      flexDirection="row"
                      justifyContent="space-between"
                      sx={{ mb: 1 }}
                    >
                      <Header
                        text={`Data indikator ${idx + 1}`}
                        variant="subtitle1"
                      />
                      {idx !== 0 && (
                        <IconButton
                          onClick={() => remove(idx)}
                          sx={{
                            padding: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Stack>
                    <CustomGrid
                      sm={[3, 9]}
                      sx={{ mb: 2 }}
                      spacing={1}
                      gridItem={[
                        <IndicatorCodeInput control={control} idx={idx} />,
                        <TextInput
                          control={control}
                          label=""
                          labelInside="Nama Indikator"
                          name={`indicator[${idx}].indicator_name`}
                          type="text"
                        />,
                      ]}
                    />
                  </Box>
                )),
                <Button onClick={addSection} variant="outlined" fullWidth>
                  +
                </Button>,
              ]}
            />
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ float: 'right' }}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </form>
          <DialogPopup
            title="Success!"
            bodyText="Indikator berhasil dibuat"
            buttonText=""
            handleClose={closeDialog}
            handleAccept={closeDialog}
            open={openDialog}
          />
          <LoadingPopup open={openLoading} />
        </CustomCard>,
      ]}
    />
  );
};

export default FormInputSection;
