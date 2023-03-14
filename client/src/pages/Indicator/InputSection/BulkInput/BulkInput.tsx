import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { useYupValidationResolver } from '@/hooks/use-yup-validation-resolver';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import { useQueryClient } from 'react-query';

interface BulkInputProps {}

const BulkInput: FC<BulkInputProps> = (props) => {
  const {} = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const schema = yup.object().shape({
    indicator_code: yup.string().required('Field tidak boleh kosong!'),
    indicator_name: yup.string().required('Field tidak boleh kosong!'),
    is_faculty_indicator: yup.boolean(),
  });

  const resolver = useYupValidationResolver(schema);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      indicator_code: '',
      indicator_name: '',
      is_faculty_indicator: '1',
    },
    resolver,
  });

  const queryClient = useQueryClient();
  const { mutate } = useInputIndicatorMutation();

  const onSubmit = (data: any) => {
    setLoading(true);

    const { indicator_code, indicator_name, is_faculty_indicator } = data;

    const normalized = is_faculty_indicator === '1' ? true : false;

    mutate(
      {
        indicator_code,
        indicator_name,
        is_faculty_indicator: normalized,
      },
      {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setSuccessDialog(true);
            setLoading(false);
          }

          queryClient.invalidateQueries('indicator-list');
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Bulk Input" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <DialogPopup
        title="Success!"
        bodyText="Indikator berhasil ditambahkan"
        buttonText=""
        handleClose={setCloseDialog}
        handleAccept={setCloseDialog}
        open={successDialog}
      />
      <LoadingPopup open={loading} />
    </Card>
  );
};

export default BulkInput;
