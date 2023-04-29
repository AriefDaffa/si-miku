import { Fragment, useState, useMemo, useCallback } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

import Table from '@/components/UI/atoms/Table';
import type {
  TargetQuarterTableProps,
  TargetQuarterTableDataArray,
} from './types';

import TableToolbar from './TableToolbar';
import TableHead from './TableHead';
import TableItem from './TableItem';
import TablePagination from './TablePagination';
import Grid from '../../atoms/Grid/Grid';

const TargetQuarterTable: FC<TargetQuarterTableProps> = (props) => {
  const { dataArray, isLoading, currentSize, handleKeywordChange, ...rest } =
    props;

  const [selected, setSelected] = useState<TargetQuarterTableDataArray[]>([]);
  const [enableCheckbox, setEnableCheckbox] = useState(false);

  const isAllChecked = useMemo(() => {
    return dataArray.length > 0 && selected.length === dataArray.length;
  }, [dataArray, selected]);

  const handleCheckbox = useCallback(() => {
    setEnableCheckbox(!enableCheckbox);
  }, [enableCheckbox]);

  const handleCheckboxClick = useCallback(
    (
      e: SyntheticEvent<HTMLButtonElement>,
      item: TargetQuarterTableDataArray
    ) => {
      e.stopPropagation();

      const selectedIndex = selected
        .map((data) => data.indicatorID)
        .indexOf(item.indicatorID);

      let selectedArray: TargetQuarterTableDataArray[] = [];

      if (selectedIndex === -1) {
        selectedArray = selectedArray.concat(selected, item);
      } else if (selectedIndex === 0) {
        selectedArray = selectedArray.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        selectedArray = selectedArray.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        selectedArray = selectedArray.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(selectedArray);
    },
    [selected]
  );

  const handleSelectAll = useCallback(
    (e: any) => {
      if (e.target.checked) {
        setSelected(dataArray);
        return;
      }
      setSelected([]);
    },
    [dataArray]
  );

  return (
    <Box>
      <TableToolbar
        handleKeywordChange={handleKeywordChange}
        handleCheckbox={handleCheckbox}
      />
      {enableCheckbox && (
        <Alert severity="info" sx={{ mb: 2, border: '1px solid #dadada' }}>
          {selected.length > 0
            ? `${selected.length} data terpilih`
            : 'Silahkan pilih data yang akan di export'}
        </Alert>
      )}
      {/* <Grid sm={[1]} gridItem={[<Card sx={{ py: 0.5, px: 1 }}>1</Card>]} /> */}
      <Card sx={{ border: '1px solid #dadada' }}>
        <Table
          headComponent={
            <TableHead
              isAllChecked={isAllChecked}
              enableCheckbox={enableCheckbox}
              handleSelectAll={handleSelectAll}
            />
          }
          bodyComponent={
            isLoading ? (
              <Fragment>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              </Fragment>
            ) : (
              dataArray.map((item, idx) => (
                <TableItem
                  key={item.indicatorID}
                  index={idx}
                  enableCheckbox={enableCheckbox}
                  handleCheckboxClick={handleCheckboxClick}
                  selected={selected}
                  {...item}
                />
              ))
            )
          }
        />
        <TablePagination {...rest} currentSize={currentSize} />
      </Card>
    </Box>
  );
};

export default TargetQuarterTable;
