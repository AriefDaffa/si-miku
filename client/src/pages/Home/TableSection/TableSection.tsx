import type { FC, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Table from '@/components/UI/atoms/Table';
import Card from '@/components/UI/atoms/Card';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { getPercentage } from '@/controller/utils/get-percentage';
import { getProgressColor } from '@/controller/utils/get-progress-bar-color';
import type { IndicatorNormalized } from '@/repository/query/IndicatorQuery';

interface TableSectionProps {
  isListIndicatorLoading: boolean;
  tablePageAndSize: {
    size: number;
    page: number;
  };
  listIndicator: IndicatorNormalized;
  setTablePageAndSize: Dispatch<SetStateAction<{ size: number; page: number }>>;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const {
    isListIndicatorLoading,
    listIndicator,
    tablePageAndSize,
    setTablePageAndSize,
  } = props;

  const header = [
    'No.',
    'Kode Indikator',
    'Nama Indikator',
    'Indikator memenuhi target',
    'Indikator belum memenuhi target',
    'Progress',
  ];

  const handleTablePagination = (e: any, value: number) => {
    setTablePageAndSize({ ...tablePageAndSize, page: value - 1 });
  };

  const handleTableSize = (event: SelectChangeEvent) => {
    setTablePageAndSize({
      page: 0,
      size: Number(event.target.value || 0),
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Header text="List indikator" />
        <SubHeader text="Menampilkan list indikator yang terdapat pada sistem" />
      </Box>
      <Card>
        <Box sx={{ mb: 3 }}>
          <TextField label="Search Indicator" />
        </Box>
        <Table
          header={header}
          isLoading={isListIndicatorLoading}
          arrayLength={listIndicator.indicatorList.length}
        >
          {listIndicator.indicatorList.map((item, idx) => (
            <TableRow
              key={idx}
              sx={{
                ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
              }}
            >
              <TableCell>
                <Header variant="subtitle2" text={`${idx + 1}`} />
              </TableCell>
              <TableCell>
                <Header variant="subtitle2" text={item.indicatorCode} />
              </TableCell>
              <TableCell sx={{ minWidth: 300 }}>
                <Header variant="subtitle2" text={item.indicatorName} />
              </TableCell>
              <TableCell align="center">
                <Header variant="subtitle2" text={`${item.count.fulfilled}`} />
              </TableCell>
              <TableCell align="center">
                <Header variant="subtitle2" text={`${item.count.failed}`} />
              </TableCell>
              <TableCell>
                <Stack flexDirection="row" alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      mr: 1,
                      borderRadius: '100%',
                      backgroundColor: getProgressColor(
                        getPercentage(
                          item.count.fulfilled,
                          item.count.fulfilled + item.count.failed
                        )
                      ),
                    }}
                  ></Box>
                  <Header
                    variant="subtitle2"
                    text={`${getPercentage(
                      item.count.fulfilled,
                      item.count.fulfilled + item.count.failed
                    )}%`}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Stack flexDirection="row" alignItems="center">
            <SubHeader text="Data per-halaman" sx={{ mr: 1 }} />
            <FormControl>
              <Select
                value={`${tablePageAndSize.size}`}
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
            count={listIndicator.totalPage}
            onChange={handleTablePagination}
            page={tablePageAndSize.page + 1}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default TableSection;
