import type { Control, UseFieldArrayRemove } from 'react-hook-form';
import type { FC } from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import { SubHeader } from '@/components/Typography';
import CustomGrid from '@/components/CustomGrid';

import { FormValues } from '../types';
import { DatePickerInput, TextInput } from '@/components/Input';

interface DynamicInputProps {
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<FormValues, any>;
}

const DynamicInput: FC<DynamicInputProps> = (props) => {
  const { index, control, remove } = props;

  const removeSection = () => {
    remove(index);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <CustomGrid
        sm={[12, 12, 6, 6]}
        gridItem={[
          <Divider />,
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <SubHeader text={`Data Indikator berdasarkan tahun ${index + 1}`} />
            {index !== 0 && (
              <IconButton
                onClick={removeSection}
                sx={{
                  padding: 0,
                  width: 44,
                  height: 44,
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>,
          <DatePickerInput
            control={control}
            label="Tahun"
            name={`indicatorValue.${index}.year`}
            isYearOnly
          />,
          <TextInput
            control={control}
            label="Target Indikator"
            name={`indicatorValue.${index}.target`}
            type="number"
          />,
          <CustomGrid
            sm={[3, 3, 3, 3]}
            gridItem={[
              <TextInput
                control={control}
                label="Kuarter 1"
                name={`indicatorValue.${index}.q1`}
                type="number"
              />,
              <TextInput
                control={control}
                label="Kuarter 2"
                name={`indicatorValue.${index}.q2`}
                type="number"
              />,
              <TextInput
                control={control}
                label="Kuarter 3"
                name={`indicatorValue.${index}.q3`}
                type="number"
              />,
              <TextInput
                control={control}
                label="Kuarter 4"
                name={`indicatorValue.${index}.q4`}
                type="number"
              />,
            ]}
          />,
        ]}
      />
    </Box>
  );
};

export default DynamicInput;
