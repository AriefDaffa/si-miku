import * as yup from 'yup';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Card from '@/presentation/global-component/UI/Card';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import FormSection from '@/presentation/page-component/IndicatorInput/FormInput/FormSection';

interface FormInputControllerProps {}

const FormInputController: FC<FormInputControllerProps> = (props) => {
  const {} = props;

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [localError, setLocalError] = useState('');

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
  const { mutate, isError, error } = useInputIndicatorMutation();

  const onSubmit = (data: any) => {
    // setLoading(true);

    const { indicator_code, indicator_name, is_faculty_indicator } = data;

    const normalized = is_faculty_indicator === '1' ? true : false;

    const splittedCode = indicator_code
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
    }
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Input Form" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection
          control={control}
          error={error}
          isError={isError}
          localError={localError}
        />
      </form>
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

export default FormInputController;
