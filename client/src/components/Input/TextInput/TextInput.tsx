import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Flexer from '@/components/Flexer';

interface TextInputProps {
  name: string;
  label: string;
  type: string;
  control: Control<any, any>;
}

const TextInput: FC<TextInputProps> = (props) => {
  const { control, name, label, type } = props;

  return (
    <Flexer>
      <Typography color="textSecondary" gutterBottom variant="overline">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField type={type} {...field} />}
      />
    </Flexer>
  );
};

export default TextInput;
