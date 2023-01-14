import { Controller } from 'react-hook-form';
import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Flexer from '@/components/Flexer';

import type { SelectInputProps } from './types';

const SelectInput: FC<SelectInputProps> = (props) => {
  const { control, name, label, menuItem, defaultValue } = props;

  return (
    <Flexer>
      <Typography color="textSecondary" gutterBottom variant="overline">
        {label}
      </Typography>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select autoWidth defaultValue={defaultValue} {...field}>
              {menuItem.map((data, idx) => (
                <MenuItem key={idx} value={data.itemValue}>
                  {data.itemTitle}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Flexer>
  );
};

export default SelectInput;
