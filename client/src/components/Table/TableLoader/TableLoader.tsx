import { times, constant } from 'lodash';
import type { FC } from 'react';

import { TableRow, TableCell, Checkbox } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const TableLoader: FC = () => {
  const array = times(9, constant(null));
  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      {array.map((data, idx) => (
        <TableCell key={idx}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableLoader;
