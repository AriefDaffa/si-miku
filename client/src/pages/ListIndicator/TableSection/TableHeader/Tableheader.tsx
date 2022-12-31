import type { FC } from 'react';

import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material';

import { useCustomTheme } from '@/context/CustomThemeContext';
import { DARK, LIGHT } from '@/theme/Colors';

const TableHeader: FC = () => {
  const { isDarkTheme } = useCustomTheme();
  const headerData = [
    { header: 'ID' },
    { header: 'Nama Indikator' },
    { header: 'Target' },
    { header: 'Kuartil 1' },
    { header: 'Kuartil 2' },
    { header: 'Kuartil 3' },
    { header: 'Kuartil 4' },
    { header: 'Status' },
    { header: '' },
  ];

  return (
    <TableHead
      sx={{
        backgroundColor: isDarkTheme ? DARK.lighter : LIGHT.darker,
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
          // checked={selectedCustomerIds.length === customers.length}
          // color="primary"
          // indeterminate={
          //   selectedCustomerIds.length > 0
          //   && selectedCustomerIds.length < customers.length
          // }
          // onChange={handleSelectAll}
          />
        </TableCell>
        {headerData.map((data, idx) => (
          <TableCell key={idx}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
              sx={{ overflowWrap: 'break-word' }}
            >
              {data.header}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
