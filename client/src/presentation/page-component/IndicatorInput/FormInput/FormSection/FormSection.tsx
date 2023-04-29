import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Grid from '@/components/UI/atoms/Grid';
import { SubHeader } from '@/components/UI/atoms/Typography';

interface FormSectionProps {
  localError: string;
  isError: boolean;
  error: unknown;
  control: Control<any, any>;
}

const FormSection: FC<FormSectionProps> = (props) => {
  const { control, localError, error, isError } = props;

  return (
    <Fragment>
      <Grid
        sm={[12, 4, 8]}
        gridItem={[
          <Controller
            name="is_faculty_indicator"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Box>
                <SubHeader text="Tipe indikator" sx={{ pb: 1 }} />
                <Select autoWidth label="" fullWidth {...field}>
                  <MenuItem value={'1'}>Indikator Fakultas</MenuItem>
                  <MenuItem value={'2'}>Indikator Jurusan</MenuItem>
                </Select>
              </Box>
            )}
          />,
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
                  error={fieldState.error || localError !== '' ? true : false}
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
        ]}
      />
      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {String(error || '')}
        </Alert>
      )}
      <Box sx={{ opacity: 0.5, mt: 1, fontStyle: 'italic' }}>
        <SubHeader text="Keterangan:" />
        <SubHeader text="Contoh input valid untuk kode indikator adalah 1.2.3" />
      </Box>
      <Box sx={{ float: 'right', my: 2 }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Fragment>
  );
};

export default FormSection;