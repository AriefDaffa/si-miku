import type { FC } from 'react';

import { Table as MuiTable, TableBody } from '@mui/material';

import TableHeader from './TableHeader';
import TableLoader from './TableLoader';
import TableContent from './TableContent';
import type { TableProps } from './types';

const Table: FC<TableProps> = (props) => {
  const { headerTitle, content, isLoading } = props;

  return (
    <MuiTable sx={{ minWidth: 1050 }}>
      <TableHeader headerTitle={headerTitle} />
      <TableBody>
        {!isLoading ? (
          content.map((data, idx) => (
            <TableContent key={idx} content={data} headerTitle={headerTitle} />
          ))
        ) : (
          <>
            <TableLoader />
            <TableLoader />
            <TableLoader />
          </>
        )}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
