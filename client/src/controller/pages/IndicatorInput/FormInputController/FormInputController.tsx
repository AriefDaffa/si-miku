import * as yup from 'yup';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Card from '@/presentation/global-component/UI/Card';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import FormSection from '@/presentation/page-component/IndicatorInput/FormInput/FormSection';
import useAddIndicatorMutation from '@/repository/mutation/indicator/AddIndicatorMutation';
import { Header } from '@/presentation/global-component/UI/Typography';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

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
      supervised_by: '1',
    },
    resolver,
  });

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useAddIndicatorMutation();

  const onSubmit = (data: any) => {
    const { indicator_code, indicator_name, supervised_by } = data;

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

    console.log(data);

    if (validated) {
      setLoading(true);
      mutate(
        {
          indicator_list: [
            {
              indicator_code,
              indicator_name,
              supervised_by,
            },
          ],
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
        <Header text="Tambah Indikator Baru" />
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
