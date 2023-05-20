import type { FC, ReactNode } from 'react';

import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Table as MuiTable } from '@mui/material';

import TableLoader from './TableLoader';
import { GREY } from '@/presentation/global-component/theme/Colors';

interface TableProps {
  headComponent: ReactNode;
  bodyComponent: ReactNode;
}

const Table: FC<TableProps> = (props) => {
  const { bodyComponent, headComponent } = props;

  return (
    <TableContainer>
      <MuiTable sx={{ overflowX: 'auto' }}>
        <TableHead sx={{ backgroundColor: GREY[200] }}>
          {headComponent}
        </TableHead>
        <TableBody>{bodyComponent}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
