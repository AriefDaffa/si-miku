import { useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import SimpleCard from '@/components/Card/SimpleCard';
import type { YearData } from '@/repository/query/YearQuery/types';

interface ToolbarSectionProps {
  yearData: YearData[];
}

const ToolbarSection: FC<ToolbarSectionProps> = (props) => {
  const { yearData } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event: SelectChangeEvent) => {
    setSearchParams({ year: event.target.value as string });
  };

  return (
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
  );
};

export default ToolbarSection;
