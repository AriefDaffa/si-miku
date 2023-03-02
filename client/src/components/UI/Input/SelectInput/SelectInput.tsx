import { Controller } from 'react-hook-form';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';

import type { SelectInputProps } from './types';

const SelectInput: FC<SelectInputProps> = (props) => {
  const { control, name, label, menuItem, defaultValue, labelInside } = props;

  return (
    <Stack>
      <Typography color="textSecondary" gutterBottom variant="overline">
        {label}
      </Typography>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              autoWidth
              defaultValue={defaultValue}
              label={labelInside}
              {...field}
            >
              {menuItem.map((data, idx) => (
                <MenuItem key={idx} value={data.itemValue}>
                  {data.itemTitle}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Stack>
  );
};

export default SelectInput;
