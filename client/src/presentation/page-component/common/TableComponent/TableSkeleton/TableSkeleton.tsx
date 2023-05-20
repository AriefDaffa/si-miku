import { Fragment } from 'react';
import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

const TableSkeleton: FC = () => {
  return (
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
  );
};

export default TableSkeleton;
