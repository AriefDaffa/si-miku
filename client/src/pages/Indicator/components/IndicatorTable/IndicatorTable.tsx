import { useState } from 'react';
import type {
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  SyntheticEvent,
} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import type { SelectChangeEvent } from '@mui/material/Select';

// import Card from '@/components/UI/atoms/Card';
import emptyIcon from '@/assets/logo/empty.png';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import type { IndicatorNormalized } from '@/repository/query/indicator/IndicatorQuery';

import TableContent from './TableContent';
import TableLoader from './TableLoader';
import TableToolbar from './TableToolbar';

interface IndicatorTableProps {
  rows: number;
  isLoading: boolean;
  keyword: string;
  page: number;
  listIndicator: IndicatorNormalized;
  setRows: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const IndicatorTable: FC<IndicatorTableProps> = (props) => {
  const { listIndicator, isLoading, setRows, rows, setPage, setKeyword } =
    props;

  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const tableHeader = ['No.', 'Kode Indikator', 'Nama Indikator'];

  const handleTablePagination = (e: any, value: number) => {
    setPage(value - 1);
  };

  const handleTableSize = (event: SelectChangeEvent) => {
    setPage(0);
    setRows(Number(event.target.value || 0));
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.toLowerCase());
  };

  const handleSelectAllClick = (e: any) => {
    if (e.target.checked) {
      const newSelecteds = listIndicator.indicatorList.map(
        (item) => item.indicatorID
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();

    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <TableToolbar
          setSelected={setSelected}
          selectedData={selected}
          handleKeywordChange={handleKeywordChange}
          totalSelected={selected.length}
        />
        <Table
          sx={{
            overflowX: 'auto',
            border: '1px solid rgba(224, 224, 224, 1);',
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: PRIMARY.main }}>
              <TableCell colSpan={4}></TableCell>
              <TableCell colSpan={3} align="center">
                <Header
                  variant="subtitle2"
                  text={'Tipe Indikator'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell colSpan={1}></TableCell>
            </TableRow>
            <TableRow
              sx={{
                backgroundColor: PRIMARY.main,
              }}
            >
              <TableCell>
                <Checkbox
                  onClick={handleSelectAllClick}
                  checked={
                    listIndicator.indicatorList.length > 0 &&
                    selected.length === listIndicator.indicatorList.length
                  }
                  sx={{ color: 'white' }}
                />
              </TableCell>
              {tableHeader.map((title, idx) => (
                <TableCell key={idx}>
                  <Header
                    variant="subtitle2"
                    text={title}
                    sx={{ color: 'white' }}
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                <Header
                  variant="subtitle2"
                  text={'Fakultas'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell align="center">
                <Header
                  variant="subtitle2"
                  text={'Departemen'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell align="center">
                <Header
                  variant="subtitle2"
                  text={'Program Studi'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              <TableLoader />
              <TableLoader />
              <TableLoader />
            </TableBody>
          ) : (
            <TableBody>
              {listIndicator.indicatorList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={100}>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ py: 2 }}
                    >
                      <img src={emptyIcon} alt="" style={{ width: 100 }} />
                      <SubHeader text="Indikator tidak ditemukan" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                listIndicator.indicatorList.map((item, idx) => (
                  <TableContent
                    key={item.indicatorID}
                    item={item}
                    index={idx}
                    selected={selected}
                    setLoading={setLoading}
                    handleCheckboxClick={handleCheckboxClick}
                  />
                ))
              )}
            </TableBody>
          )}
        </Table>
      </Box>
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        sx={{ p: 3 }}
      >
        <Stack flexDirection="row" alignItems="center">
          <SubHeader text="Menampilkan" sx={{ mr: 1 }} />
          <FormControl>
            <Select
              value={`${rows}`}
              variant="standard"
              onChange={handleTableSize}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={75}>75</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <SubHeader text={`data dari total ${listIndicator.totalData} data`} />
        </Stack>
        <Pagination
          count={listIndicator.totalPage}
          onChange={handleTablePagination}
          page={listIndicator.currentPage + 1}
        />
      </Stack>
      <LoadingPopup open={loading} />
    </Card>
  );
};

export default IndicatorTable;
