import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import type { FC } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { YearData } from '@/repository/query/YearQuery/types';

interface TableToolbarProps {
  yearData: YearData[];
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const { yearData } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event: SelectChangeEvent) => {
    setSearchParams({ year: event.target.value as string });
  };

  return (
    <Box
      sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search Indicator"
          variant="outlined"
        />
      </Box>
      <Box>
        {yearData && (
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchParams.get('year') || ''}
              autoWidth
              label="Age"
              onChange={handleClick}
            >
              {yearData.map((data, idx) => (
                <MenuItem key={idx} value={data.year_id}>
                  {data.year_id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};

export default TableToolbar;
