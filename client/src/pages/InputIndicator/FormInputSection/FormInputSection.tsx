import { useForm } from 'react-hook-form';
import { split } from 'lodash';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import { Header, SubHeader } from '@/components/Typography';
import { TextInput } from '@/components/Input';

import IndicatorCodeInput from './IndicatorCodeInput';
import DataJurusanInput from './DataJurusanInput';

import { defaultValues } from './constant';

const FormInputSection: FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const { mutate, isLoading } = useInputIndicatorMutation();

  const handleOnSubmit = (data: any) => {
    const { indicatorCode, ...rest } = data;
    // console.log({
    //   indicator_code: split(indicatorCode, '.')
    //     .filter((n) => n !== ' ')
    //     .join('.'),
    //   ...rest,
    // });

    mutate({
      indicator_code: split(indicatorCode, '.')
        .filter((n) => n !== ' ')
        .join('.'),
      ...rest,
    });
  };

  return (
    <CustomGrid
      sx={{ pt: 2 }}
      gridItem={[
        <CustomCard>
          <Header text="Form Input" />
          <SubHeader text="Input data indikator melalui form dibawah ini" />
          <Divider sx={{ mt: 2, mb: 3 }} />
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <CustomGrid
              sm={[2, 10]}
              gridItem={[
                // <Header text="Data indikator" variant="subtitle1" />,
                <IndicatorCodeInput control={control} />,
                <TextInput
                  control={control}
                  label=""
                  labelInside="Nama Indikator"
                  name="indicator_name"
                  type="text"
                />,
                // <Header text="Data Jurusan" variant="subtitle1" />,
                <DataJurusanInput control={control} />,
              ]}
            />
            {/* <Divider sx={{ pt: 6, mb: 2 }} /> */}
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              //   disabled={isLoading}
              sx={{ float: 'right' }}
            >
              {/* {isLoading ? 'Loading...' : 'Submit'} */}
              Submit
            </Button>
          </form>
        </CustomCard>,
      ]}
    />
  );
};

export default FormInputSection;
