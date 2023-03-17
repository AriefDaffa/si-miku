import { useState } from 'react';
import type { FC, SyntheticEvent, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Pill from '@/components/UI/atoms/Pill';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Card from '@/components/UI/atoms/Card';
import Table from '@/components/UI/atoms/Table';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';
import { useAuthContext } from '@/context/AuthContext';
import type { TargetQuarterNormalized } from '@/repository/query/IndicatorByIdQuery';

import DeleteBulkButton from './DeleteBulkButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { tableHeader } from './constant';
import { SelectedPropTypes } from './types';

interface DataYearSectionProps {
  indicatorID: number;
  isLoading: boolean;
  data: TargetQuarterNormalized[];
  setSelectedData: (data: TargetQuarterNormalized) => void;
}

const DataYearSection: FC<DataYearSectionProps> = (props) => {
  const { data, indicatorID, isLoading, setSelectedData } = props;

  const [selected, setSelected] = useState<SelectedPropTypes[]>([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { isManagement } = useAuthContext();

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.map((item) => {
        return {
          indicator_id: indicatorID,
          year_id: item.yearID,
          target_quarter_id: item.targetQuarterID,
        };
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    e: SyntheticEvent<HTMLButtonElement>,
    item: SelectedPropTypes
  ) => {
    e.stopPropagation();

    const selectedIndex = selected
      .map((item) => item.target_quarter_id)
      .indexOf(item.target_quarter_id);
    let newSelected: SelectedPropTypes[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
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
    <Card sx={{ overflowX: 'auto' }}>
      <Stack
        direction={{ sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Header text="List data indikator" />
          <SubHeader text="Klik pada salah satu data untuk melihat detail data tersebut" />
        </Box>
      </Stack>
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
            onClick={() => setSelectedData(item)}
          >
            {isManagement && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selected
                      .map((item) => item.target_quarter_id)
                      .indexOf(item.targetQuarterID) !== -1
                  }
                  onClick={(e) =>
                    handleCheckboxClick(e, {
                      indicator_id: indicatorID,
                      target_quarter_id: item.targetQuarterID,
                      year_id: item.yearID,
                    })
                  }
                />
              </TableCell>
            )}
            <TableCell>
              <Header variant="subtitle2" text={`${idx + 1 + page * rows}`} />
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
                    item={item}
                    indicatorID={indicatorID}
                    setSelected={setSelected}
                  />
                  <DeleteButton
                    data={item}
                    indicatorID={indicatorID}
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
          <Box>
            <DeleteBulkButton
              indicatorID={indicatorID}
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
    </Card>
  );
};

export default DataYearSection;
