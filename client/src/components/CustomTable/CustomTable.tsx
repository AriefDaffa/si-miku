import type { FC, ReactNode } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import emptyIcon from '@/assets/logo/empty.png';
import { Header, SubHeader } from '@/components/Typography';

import TableLoader from './TableLoader';

interface CustomTableProps {
  isLoading: boolean;
  header: string[];
  children: ReactNode;
}

const CustomTable: FC<CustomTableProps> = (props) => {
  const { header, children, isLoading } = props;

  return (
    <TableContainer>
      <Table sx={{ overflowX: 'auto' }}>
        <TableHead sx={{ borderTop: '1px solid rgba(224, 224, 224, 1);' }}>
          <TableRow>
            {header.map((title, idx) => (
              <TableCell key={idx}>
                <SubHeader text={title} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              <TableLoader />
              <TableLoader />
              <TableLoader />
            </>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
