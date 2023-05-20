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

interface IndicatorChartToolbarProps {
  sort: boolean;
  yearRange: number;
  onYearRangeChange: (e: SelectChangeEvent) => void;
  onSortChange: (e: SelectChangeEvent) => void;
}

const IndicatorChartToolbar: FC<IndicatorChartToolbarProps> = (props) => {
  const { yearRange, sort, onYearRangeChange, onSortChange } = props;

  return (
    <Box sx={{ mt: 1 }}>
      <Stack direction={{ sm: 'row' }} gap={1}>
        {/* <Card
          sx={{
            pl: 1,
            py: 0.5,
            width: 'max-content',
            border: '1px solid #dadada',
          }}
        >
          <FormControl>
            <Select
              value="Bar Chart"
              defaultValue="Bar Chart"
              sx={{
                '& > fieldset': { border: 'none' },
              }}
              SelectDisplayProps={{ style: { padding: '0 36px 0 0' } }}
            >
              <MenuItem value="Bar Chart">Bar Chart</MenuItem>
              <MenuItem>Line Chart</MenuItem>
            </Select>
          </FormControl>
        </Card> */}
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
              value={String(yearRange)}
              onChange={onYearRangeChange}
              sx={{
                '& > fieldset': { border: 'none' },
              }}
              SelectDisplayProps={{ style: { padding: '0 36px 0 0' } }}
            >
              <MenuItem value={5}>5 Tahun terakhir</MenuItem>
              <MenuItem value={10}>10 Tahun terakhir</MenuItem>
              <MenuItem value={15}>15 Tahun terakhir</MenuItem>
              <MenuItem value={20}>20 Tahun terakhir</MenuItem>
            </Select>
          </FormControl>
        </Card>
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
              value={String(sort)}
              onChange={onSortChange}
              sx={{
                '& > fieldset': { border: 'none' },
              }}
              SelectDisplayProps={{ style: { padding: '0 36px 0 0' } }}
            >
              <MenuItem value={'true'}>Ascending</MenuItem>
              <MenuItem value={'false'}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </Stack>
    </Box>
  );
};

export default IndicatorChartToolbar;
