import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useState } from 'react';
import type { FC, SyntheticEvent, ChangeEvent } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import Table from '@/components/UI/atoms/Table';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';
import { getProgressColor } from '@/utils/get-progress-bar-color';
import { getPercentage } from '@/utils/get-percentage';
import type { UserDataNormalized } from '@/repository/query/UserQuery';

import DeleteButton from './DeleteButton';
import DeleteBulkButton from './DeleteBulkButton';
import EditButton from './EditButton';
import { tableHeader } from './constant';

interface TableSectionProps {
  isLoading: boolean;
  data: UserDataNormalized[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { data, isLoading } = props;

  const [selected, setSelected] = useState<number[]>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [sort, setSort] = useState('asc');

  const navigate = useNavigate();

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.map((item) => item.userID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id: number) => {
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

  const handleTablePagination = (e: any, value: number) => {
    setPage(value - 1);
  };

  const handleTableSize = (event: SelectChangeEvent) => {
    setPage(0);
    setRows(Number(event.target.value || 0));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.toLowerCase());
  };

  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  const modifiedData = data
    .filter((a) => String(a.userName).toLowerCase().includes(keyword))
    .slice(page * rows, page * rows + rows);

  return (
    <Grid
      spacing={1}
      gridItem={[
        <Card sx={{ overflowX: 'auto' }}>
          {/* <Box sx={{ mb: 2 }}>
            <Header text="List Indikator" variant="h6" />
            <SubHeader text="Pilih salah satu indikator dibawah untuk melihat perkembangan indikator tersebut" />
          </Box> */}
          <Stack
            flexDirection="column"
            direction={{ sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack flexDirection="row" sx={{ flex: 1 }}>
              <TextField
                label="Search Operator"
                sx={{ maxWidth: 500, width: '100%' }}
                disabled={!data.length}
                onChange={debounce(handleChange, 300)}
              />
              {/* <IconButton>
                <FilterListIcon />
              </IconButton> */}
            </Stack>
            <Stack>
              <DeleteBulkButton
                selectedData={selected}
                setSelected={setSelected}
              />
              {selected.length !== 0 && (
                <SubHeader
                  text={`Selected ${selected.length} data`}
                  sx={{ opacity: 0.3, textAlign: 'center' }}
                />
              )}
            </Stack>
          </Stack>
          <Table
            withCheckbox
            header={tableHeader}
            isLoading={isLoading}
            arrayLength={!keyword ? data.length : modifiedData.length}
            totalSelected={selected.length}
            onSelectAll={handleSelectAllClick}
          >
            {modifiedData.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() => handleCheckboxClick(item.userID)}
                // onClick={() =>
                //   navigate(`/dashboard/indicator/${item.}`, {
                //     replace: true,
                //   })
                // }
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(item.userID) !== -1}
                    onClick={() => handleCheckboxClick(item.userID)}
                  />
                </TableCell>
                <TableCell>
                  <Header
                    variant="subtitle2"
                    text={`${idx + 1 + page * rows}`}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: '120px' }}>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    sx={{ gap: 1 }}
                  >
                    <Avatar src={item.userImage} />
                    <Header variant="subtitle2" text={`${item.userName}`} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.userEmail}`} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Stack flexDirection="row">
                    <EditButton
                      id={item.userID}
                      indicatorCode={''}
                      indicatorName={''}
                      setSelected={setSelected}
                    />
                    <DeleteButton id={item.userID} setSelected={setSelected} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <Stack
            flexDirection="column-reverse"
            direction={{ sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <Stack flexDirection="row" alignItems="center">
              <SubHeader text="Menampilkan" sx={{ mr: 1 }} />
              <FormControl>
                <Select
                  value={`${rows}`}
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
              <SubHeader
                text={`data dari total ${data.length} data`}
                sx={{ mr: 1 }}
              />
            </Stack>
            <Pagination
              count={Math.ceil(
                keyword
                  ? data.filter((a) =>
                      a.userName.toLowerCase().includes(keyword)
                    ).length / rows
                  : data.length / rows
              )}
              onChange={handleTablePagination}
              page={page + 1}
            />
          </Stack>
          {/* <Box sx={{ float: 'right', mb: 2 }}>
            <DeleteBulkButton
              selectedData={selected}
              setSelected={setSelected}
            />
          </Box> */}
        </Card>,
      ]}
    />
  );
};

export default TableSection;
