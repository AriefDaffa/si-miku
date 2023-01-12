import { noop } from 'lodash';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import type { SubHeaderProps } from './types';

const SubHeader: FC<SubHeaderProps> = (props) => {
  const {
    text,
    withSelect = false,
    selectValue,
    onChange = noop,
    menuItem = [],
  } = props;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5">{text}</Typography>
      {withSelect && (
        <FormControl size="small" variant="standard">
          {/* <InputLabel id="demo-simple-select-label">Chart</InputLabel> */}
          <Select
            // labelId="demo-simple-select-label"
            // id="demo-simple-select"
            value={selectValue}
            autoWidth
            label="Age"
            onChange={onChange}
          >
            {menuItem.map((data, idx) => (
              <MenuItem key={idx} value={data.value}>
                {data.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default SubHeader;
