import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface DatePickerInputProps {
  name: string;
  label: string;
  isYearOnly: boolean;
  control: Control<any, any>;
}

const DatePickerInput: FC<DatePickerInputProps> = (props) => {
  const { control, name, label, isYearOnly } = props;

  return (
    <Stack>
      <Typography color="textSecondary" gutterBottom variant="overline">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            views={isYearOnly ? ['year'] : ['year', 'day']}
            openTo={isYearOnly ? 'year' : 'day'}
            renderInput={(params) => <TextField {...params} />}
            {...field}
          />
        )}
      />
    </Stack>
  );
};

export default DatePickerInput;
