import { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import type { FC, SyntheticEvent } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CustomGrid from '@/components/CustomGrid';
import { Header, SubHeader } from '@/components/Typography';
import { TextInput } from '@/components/Input';

import YearInput from './YearInput';
import { jurusanData } from '../constant';

interface DataJurusanInputProps {
  control: Control<any, any>;
}

const DataJurusanInput: FC<DataJurusanInputProps> = (props) => {
  const { control } = props;

  const { fields } = useFieldArray({
    control,
    name: 'indicator_year',
  });

  return (
    <div>
      {fields.map((item, idx) => (
        <Box key={idx} sx={{ my: 2 }}>
          <Stack
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ mb: 4 }}
          >
            <Avatar
              src={jurusanData[idx].logo}
              alt="tif"
              variant="rounded"
              sx={{ width: 'fit-content' }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Header text={jurusanData[idx].itemTitle} variant="subtitle1" />
          </Stack>

          <YearInput control={control} index={idx} />
          <Divider sx={{ pb: 4 }} />
        </Box>
      ))}
    </div>
  );
};

export default DataJurusanInput;
