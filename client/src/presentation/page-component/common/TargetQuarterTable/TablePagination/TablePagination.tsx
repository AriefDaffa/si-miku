import { Fragment } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import type { SelectChangeEvent } from '@mui/material/Select';

import { SubHeader } from '@/components/UI/atoms/Typography';

interface TablePaginationProps {
  totalPage: number;
  totalData: number;
  currentPage: number;
  currentSize: number;
  handleTablePagination: (e: any, value: number) => void;
  handleTableSize: (event: SelectChangeEvent) => void;
}

const TablePagination: FC<TablePaginationProps> = (props) => {
  const {
    currentPage,
    totalPage,
    currentSize,
    handleTablePagination,
    handleTableSize,
  } = props;

  return (
    <Stack
      direction={{ sm: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      sx={{ m: 2 }}
    >
      <Stack flexDirection="row" alignItems="center">
        <SubHeader text="Data per-halaman" sx={{ mr: 1 }} />
        <FormControl>
          <Select
            value={`${currentSize}`}
            onChange={handleTableSize}
            variant="standard"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Pagination
        count={totalPage}
        onChange={handleTablePagination}
        page={currentPage + 1}
      />
    </Stack>
  );
};

export default TablePagination;
