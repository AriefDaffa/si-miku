import { useForm, Controller, useFieldArray } from 'react-hook-form';
import moment from 'moment';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SimpleCard from '@/components/Card/SimpleCard';

import DynamicInput from './DynamicInput';
import type { FormValues } from './types';
import Flexer from '@/components/Flexer';
import CustomGrid from '@/components/CustomGrid';

const FormSection: FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'indicatorValue',
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <SimpleCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomGrid
          sm={[6]}
          gridItem={[
            <Flexer>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Nama Indikator
              </Typography>
              <Controller
                name="indicatorName"
                control={control}
                render={({ field }) => <TextField {...field} />}
              />
            </Flexer>,
            fields.map((field, index) => (
              <DynamicInput
                key={field.id}
                control={control}
                index={index}
                remove={remove}
              />
            )),
            <Button
              color="primary"
              size="large"
              variant="outlined"
              fullWidth
              onClick={() =>
                append({
                  q1: 0,
                  q2: 0,
                  q3: 0,
                  q4: 0,
                  target: 0,
                  year: moment().year(),
                })
              }
            >
              Tambah Input Tahun
            </Button>,
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>,
          ]}
        />
      </form>
    </SimpleCard>
  );
};

export default FormSection;
