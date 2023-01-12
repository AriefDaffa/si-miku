import { Controller } from 'react-hook-form';
import type { Control, UseFieldArrayRemove } from 'react-hook-form';
import type { FC } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Flexer from '@/components/Flexer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import { SubHeader } from '@/components/Typography';
import CustomGrid from '@/components/CustomGrid';

import { FormValues } from '../types';

interface DynamicInputProps {
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<FormValues, any>;
}

const DynamicInput: FC<DynamicInputProps> = (props) => {
  const { index, control, remove } = props;

  return (
    <Box sx={{ pb: 4 }}>
      <CustomGrid
        sm={[12, 12, 6, 6]}
        gridItem={[
          <Divider />,
          <Flexer flexDirection="row" alignItems="center">
            <SubHeader text={`Data Indikator ${index + 1}`} />
            {index !== 0 && (
              <IconButton
                onClick={() => remove(index)}
                sx={{
                  padding: 0,
                  width: 44,
                  height: 44,
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Flexer>,
          <Flexer>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Tahun
            </Typography>
            <Controller
              name={`indicatorValue.${index}.year`}
              control={control}
              render={({ field }) => (
                <DatePicker
                  views={['year']}
                  openTo="year"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              )}
            />
          </Flexer>,
          <Flexer>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Target Indikator
            </Typography>
            <Controller
              name={`indicatorValue.${index}.target`}
              control={control}
              render={({ field }) => <TextField {...field} />}
            />
          </Flexer>,
          <CustomGrid
            sm={[3, 3, 3, 3]}
            gridItem={[
              <Flexer>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  Kuarter 1
                </Typography>
                <Controller
                  name={`indicatorValue.${index}.q1`}
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Flexer>,
              <Flexer>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  Kuarter 2
                </Typography>
                <Controller
                  name={`indicatorValue.${index}.q2`}
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Flexer>,
              <Flexer>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  Kuarter 3
                </Typography>
                <Controller
                  name={`indicatorValue.${index}.q3`}
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Flexer>,
              <Flexer>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  Kuarter 4
                </Typography>
                <Controller
                  name={`indicatorValue.${index}.q4`}
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Flexer>,
            ]}
          />,
        ]}
      />
    </Box>
  );
};

export default DynamicInput;
