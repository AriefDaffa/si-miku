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

import type { TableHeaderProps } from './types';

const TableHeader: FC<TableHeaderProps> = (props) => {
  const { headerTitle } = props;
  const { isDarkTheme } = useCustomTheme();

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
        {headerTitle.map((data, idx) => (
          <TableCell key={idx}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              {data.title}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
