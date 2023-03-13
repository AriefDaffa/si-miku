import { useState } from 'react';
import type { FC, SyntheticEvent, ChangeEvent, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Pill from '@/components/UI/atoms/Pill';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import Table from '@/components/UI/atoms/Table';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';
import { useAuthContext } from '@/context/AuthContext';
import type { TargetQuartersNormalized } from '@/repository/query/IndicatorByIdQuery';

import DeleteButton from './DeleteButton';
import DeleteBulkButton from './DeleteBulkButton';
import EditButton from './EditButton';
import ProgressDialog from './ProgressDialog';
import { defaultVal, tableHeader } from './constant';

interface TableSectionProps {
  isLoading: boolean;
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  data: TargetQuartersNormalized[];
  TambahDataComponent?: ReactNode;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const {
    data,
    indicatorCode,
    indicatorID,
    indicatorName,
    isLoading,
    TambahDataComponent,
  } = props;

  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [dataOpen, SetDataOpen] =
    useState<TargetQuartersNormalized>(defaultVal);
  const [openFullDialog, setopenFullDialog] = useState(false);

  const { isManagement } = useAuthContext();

  const handleOpenFullDialog = (data: TargetQuartersNormalized) => {
    setopenFullDialog(true);
    SetDataOpen(data);
  };

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.map((item) => item.yearID);
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

  const handleTablePagination = (e: any, value: number) => {
    setPage(value - 1);
  };

  const handleTableSize = (event: SelectChangeEvent) => {
    setPage(0);
    setRows(Number(event.target.value || 0));
  };

  const slicedData = data.slice(page * rows, page * rows + rows);

  return (
    <Grid
      spacing={1}
      // sx={{ pt: 2 }}
      gridItem={[
        <Card sx={{ overflowX: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Header text="List data indikator" />
            <SubHeader text="Klik pada salah satu data untuk melihat detail data tersebut" />
          </Box>
          <Table
            withCheckbox={isManagement}
            header={tableHeader}
            isLoading={isLoading}
            arrayLength={data.length}
            totalSelected={selected.length}
            onSelectAll={handleSelectAllClick}
          >
            {slicedData.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() => handleOpenFullDialog(item)}
              >
                {isManagement && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(item.yearID) !== -1}
                      onClick={(e) => handleCheckboxClick(e, item.yearID)}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Header
                    variant="subtitle2"
                    text={`${idx + 1 + page * rows}`}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: '120px' }}>
                  <Header variant="subtitle2" text={`${item.yearValue}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.q1}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.q2}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.q3}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.q4}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.targetValue}`} />
                </TableCell>
                <TableCell>
                  <Pill isError={item.isTargetFulfilled === false}>
                    <Header
                      variant="subtitle2"
                      text={`${
                        item.isTargetFulfilled === true
                          ? 'Memenuhi'
                          : 'Belum Memenuhi'
                      }`}
                    />
                  </Pill>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {isManagement && (
                    <Stack flexDirection="row">
                      <EditButton
                        id={item.yearID}
                        indicatorCode={'item.yearID'}
                        indicatorName={'item.q1'}
                        setSelected={setSelected}
                      />
                      <DeleteButton
                        id={item.yearID}
                        setSelected={setSelected}
                      />
                    </Stack>
                  )}
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
              count={Math.ceil(data.length / rows)}
              onChange={handleTablePagination}
              page={page + 1}
            />
          </Stack>
          {isManagement && (
            <Stack flexDirection="row" sx={{ float: 'right', mb: 2 }}>
              <Box sx={{ mr: 1 }}>{TambahDataComponent}</Box>
              <Box>
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
              </Box>
            </Stack>
          )}
          <ProgressDialog
            data={dataOpen}
            indicatorName={indicatorName}
            indicatorCode={indicatorCode}
            open={openFullDialog}
            setOpenFullDialog={setopenFullDialog}
          />
        </Card>,
      ]}
    />
  );
};

export default TableSection;
