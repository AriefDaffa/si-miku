import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC, SyntheticEvent, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Grid from '@/components/UI/Grid';
import Card from '@/components/UI/Card';
import Table from '@/components/UI/Table';
import { Header, SubHeader } from '@/components/UI/Typography';
import { GREY } from '@/components/theme/Colors';
import type { IndicatorResponseNormalized } from '@/repository/query/IndicatorQuery/types';

import DeleteButton from './DeleteButton';
import { tableHeader } from './constant';
import DeleteBulkButton from './DeleteBulkButton';

interface TableSectionProps {
  isLoading: boolean;
  data: IndicatorResponseNormalized[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { data, isLoading } = props;
  const [selected, setSelected] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.map((item) => item.indicatorID);
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

  // @TODO Add pagination (low prio)
  return (
    <Grid
      sx={{ pt: 2 }}
      gridItem={[
        <Card sx={{ overflowX: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Header text="List Indikator" variant="h6" />
            <SubHeader text="Pilih salah satu indikator dibawah untuk melihat perkembangan indikator tersebut" />
          </Box>
          <Table
            withCheckbox
            header={tableHeader}
            isLoading={isLoading}
            arrayLength={data.length}
            totalSelected={selected.length}
            onSelectAll={handleSelectAllClick}
          >
            {data.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() =>
                  navigate(`/dashboard/indicator/${item.indicatorID}`, {
                    replace: true,
                  })
                }
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(item.indicatorID) !== -1}
                    onClick={(e) => handleCheckboxClick(e, item.indicatorID)}
                  />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${idx + 1}`} />
                </TableCell>
                <TableCell sx={{ minWidth: '120px' }}>
                  <Header variant="subtitle2" text={`${item.indicatorCode}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.indicatorName}`} />
                </TableCell>
                <TableCell>
                  <DeleteButton
                    id={item.indicatorID}
                    setSelected={setSelected}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <DeleteBulkButton selectedData={selected} setSelected={setSelected} />
        </Card>,
      ]}
    />
  );
};

export default TableSection;
