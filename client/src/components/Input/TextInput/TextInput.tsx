import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface TextInputProps {
  name: string;
  label: string;
  type: string;
  control: Control<any, any>;
}

const TextInput: FC<TextInputProps> = (props) => {
  const { control, name, label, type } = props;

  return (
    <Stack>
      <Typography color="textSecondary" gutterBottom variant="overline">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TextField
            type={type}
            error={fieldState.error ? true : false}
            helperText={fieldState.error ? 'Form tidak boleh kosong' : ''}
            {...field}
          />
        )}
      />
    </Stack>
  );
};

export default TextInput;
