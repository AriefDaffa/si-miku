import { useMemo, Fragment } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { SelectChangeEvent } from '@mui/material/Select';

import { YearProgressNormalized } from '@/repository/query/indicator/IndicatorOverview';
import CustomChart from '@/presentation/global-component/UI/CustomChart/CustomChart';
import useChartStyle from '@/controller/hooks/use-chart-style';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle/AvatarTitle';
import Grid from '@/presentation/global-component/UI/Grid/Grid';
import { SubHeader } from '@/presentation/global-component/UI/Typography';

interface FacultyTableFilterProps {
  status: number;
  onStatusChange: (e: SelectChangeEvent) => void;
}

const FacultyTableFilter: FC<FacultyTableFilterProps> = (props) => {
  const { status, onStatusChange } = props;

  return (
    <Box sx={{ mt: 1 }}>
      {/* <SubHeader text="Filter" /> */}
      <Stack direction={{ sm: 'row' }} gap={1}>
        <Card
          sx={{
            pl: 1,
            py: 0.5,
            width: 'max-content',
            border: '1px solid #dadada',
          }}
        >
          <FormControl>
            <Select
              value={String(status)}
              onChange={onStatusChange}
              sx={{
                '& > fieldset': { border: 'none' },
              }}
              SelectDisplayProps={{ style: { padding: '0 36px 0 0' } }}
            >
              <MenuItem value={0}>Tampilkan Semua</MenuItem>
              <MenuItem value={1}>Memenuhi</MenuItem>
              <MenuItem value={2}>Belum Memenuhi</MenuItem>
              <MenuItem value={3}>Belum Ditambahkan</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </Stack>
    </Box>
  );
};

export default FacultyTableFilter;
