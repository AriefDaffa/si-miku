import { useForm, useFieldArray } from 'react-hook-form';
import { split } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';

import Button from '@mui/material/Button';

import CustomGrid from '@/components/CustomGrid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { SelectInput, TextInput } from '@/components/Input';
import { SubHeader } from '@/components/Typography';
import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';

import DynamicInput from './DynamicInput';
import IndicatorCodeInput from './IndicatorCodeInput';
import type { FormValues } from './types';

const FormSection: FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      indicatorCode: '',
      indicatorName: '',
      jurusan: '',
      indicatorValue: [
        {
          q1: 0,
          q2: 0,
          q3: 0,
          q4: 0,
          target: 0,
          year: moment().year(),
        },
      ],
    },
  });

  const { mutate, isLoading } = useInputIndicatorMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'indicatorValue',
    rules: {
      required: true,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { indicatorCode, indicatorName, indicatorValue, jurusan } = data;

    mutate({
      indicator_id: split(indicatorCode, '.')
        .filter((n) => n !== ' ')
        .join('.'),
      indicator_name: indicatorName,
      major_id: Number(jurusan),
      indicator_year: indicatorValue.map(({ year, ...rest }) => {
        return { ...rest, year_id: year };
      }),
    });
  };

  const addYearSection = () => {
    append({
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target: 0,
      year: 2010,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomGrid
          sm={[12, 6, 6, 6]}
          gridItem={[
            <>
              <SubHeader text="Form input indikator" />
              <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                Lengkapi form dibawah untuk memasukkan data kedalam sistem
              </Typography>
            </>,
            <IndicatorCodeInput control={control} />,
            <SelectInput
              control={control}
              label="Jurusan"
              name="jurusan"
              defaultValue="1"
              menuItem={[
                { itemTitle: 'Teknik Informatika', itemValue: '1' },
                { itemTitle: 'Teknik Komputer', itemValue: '2' },
                { itemTitle: 'Sistem Informasi', itemValue: '3' },
                { itemTitle: 'Teknologi Informasi', itemValue: '4' },
                { itemTitle: 'Pendidikan Teknologi Informasi', itemValue: '5' },
                { itemTitle: 'Magister Ilmu Komputer', itemValue: '6' },
              ]}
            />,
            <TextInput
              control={control}
              label="Nama Indikator"
              name="indicatorName"
              type="text"
            />,
            // <CustomGrid
            //   gridItem={[
            //     fields.map((field, index) => (
            //       <DynamicInput
            //         key={field.id}
            //         control={control}
            //         index={index}
            //         remove={remove}
            //       />
            //     )),
            //     <Button
            //       color="primary"
            //       size="large"
            //       variant="outlined"
            //       fullWidth
            //       onClick={addYearSection}
            //     >
            //       Tambah Input Tahun
            //     </Button>,
            //   ]}
            // />,
            <Divider />,
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ float: 'right' }}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>,
          ]}
        />
      </form>
    </>
  );
};

export default FormSection;
