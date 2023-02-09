import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface IndicatorCodeInputProps {
  control: Control<any, any>;
}

const IndicatorCodeInput: FC<IndicatorCodeInputProps> = (props) => {
  const { control } = props;

  return (
    <Stack>
      {/* <Typography color="textSecondary" gutterBottom variant="overline">
        Kode Indikator
      </Typography> */}
      <FormControl>
        <Controller
          name="indicator_code"
          control={control}
          render={({ field: { onChange, name, value, ref } }) => (
            <PatternFormat
              customInput={TextField}
              format="%.%.%"
              patternChar="%"
              label="Kode Indikator"
              onValueChange={(value) => onChange(value.formattedValue)}
              name={name}
              value={value}
              inputRef={ref}
              sx={{ mt: 0.5 }}
            />
          )}
        />
      </FormControl>
    </Stack>
  );
};

export default IndicatorCodeInput;
