import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface MajorPickerProps {
  currentMajor: number;
  major: IndicatorMajorsNormalized[];
  setCurrentMajor: Dispatch<SetStateAction<number>>;
}

const MajorPicker: FC<MajorPickerProps> = (props) => {
  const { major, currentMajor, setCurrentMajor } = props;

  const handleChangeMajor = (e: SelectChangeEvent) => {
    setCurrentMajor(Number(e.target.value));
  };

  return (
    <FormControl fullWidth>
      {/* <InputLabel>Program Studi</InputLabel> */}
      <Select
        label=""
        value={String(currentMajor)}
        onChange={handleChangeMajor}
        size="small"
        sx={{ py: 0.4 }}
      >
        {major.map((item) => (
          <MenuItem value={item.major.majorID} key={item.indicatorMajorID}>
            <Stack flexDirection="row" alignItems="center">
              <ListItemIcon sx={{ mr: 1 }}>
                <img
                  src={item.major.majorImage}
                  alt=""
                  style={{ width: 40, objectFit: 'cover' }}
                />
              </ListItemIcon>
              <ListItemText primary={item.major.majorName} />
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MajorPicker;
