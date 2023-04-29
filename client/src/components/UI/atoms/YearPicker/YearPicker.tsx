import moment from 'moment';
import type { Dispatch, FC, SetStateAction } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface YearPickerProps {
  yearValue: string;
  handleSelectYear: (year: string | null) => void;
  label?: string;
}

const YearPicker: FC<YearPickerProps> = (props) => {
  const { label = '', yearValue, handleSelectYear } = props;

  return (
    <DatePicker
      value={yearValue}
      label={label}
      views={['year']}
      openTo={'year'}
      onChange={handleSelectYear}
      renderInput={(params) => (
        <TextField
          // fullWidth
          {...params}
          sx={{ backgroundColor: 'white', borderColor: PRIMARY.main }}
        />
      )}
    />
  );
};

export default YearPicker;
