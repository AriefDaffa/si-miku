import type { FC } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import CustomGrid from '@/components/CustomGrid';
import { Header, SubHeader } from '@/components/Typography';
import { DatePickerInput, TextInput } from '@/components/Input';

interface YearInputProps {
  index: number;
  control: Control<any, any>;
}

const YearInput: FC<YearInputProps> = (props) => {
  const { control, index } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `indicator_year[${index}].year_data`,
  });

  const addSection = () => {
    append({
      year: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target: 0,
    });
  };

  return (
    <div>
      {fields.map((item, idx) => (
        <Box key={idx}>
          <Stack flexDirection="row" justifyContent="space-between">
            <SubHeader text={`Data tahun ${idx + 1}`} sx={{ mb: 2 }} />
            {idx !== 0 && (
              <IconButton
                onClick={() => remove(idx)}
                sx={{
                  padding: 0,
                  width: 44,
                  height: 44,
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
          <CustomGrid
            sm={[6, 6, 12]}
            sx={{ pb: 3 }}
            gridItem={[
              <DatePickerInput
                control={control}
                label=""
                labelInside="Tahun"
                name={`indicator_year[${index}].year_data[${idx}].year`}
                isYearOnly
              />,
              <TextInput
                control={control}
                label=""
                labelInside="Target"
                name={`indicator_year[${index}].year_data[${idx}].target`}
                type="number"
              />,
              <CustomGrid
                sm={[3, 3, 3, 3]}
                gridItem={[
                  <TextInput
                    control={control}
                    label=""
                    labelInside="Q1"
                    name={`indicator_year[${index}].year_data[${idx}].q1`}
                    type="number"
                  />,
                  <TextInput
                    control={control}
                    label=""
                    labelInside="Q2"
                    name={`indicator_year[${index}].year_data[${idx}].q2`}
                    type="number"
                  />,
                  <TextInput
                    control={control}
                    label=""
                    labelInside="Q3"
                    name={`indicator_year[${index}].year_data[${idx}].q3`}
                    type="number"
                  />,
                  <TextInput
                    control={control}
                    label=""
                    labelInside="Q4"
                    name={`indicator_year[${index}].year_data[${idx}].q4`}
                    type="number"
                  />,
                ]}
              />,
            ]}
          />
        </Box>
      ))}
      <Button fullWidth variant="contained" onClick={addSection}>
        +
      </Button>
    </div>
  );
};

export default YearInput;
