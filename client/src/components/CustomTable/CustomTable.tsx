import { noop } from 'lodash';
import type { FC, ReactNode, ChangeEvent } from 'react';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
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
  arrayLength: number;
  header: string[];
  children: ReactNode;
  totalSelected?: number;
  onSelectAll?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    header,
    children,
    isLoading,
    arrayLength,
    totalSelected = 0,
    onSelectAll = noop,
  } = props;

  return (
    <TableContainer>
      <Table sx={{ overflowX: 'auto' }}>
        <TableHead sx={{ borderTop: '1px solid rgba(224, 224, 224, 1);' }}>
          <TableRow>
            {onSelectAll && (
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={onSelectAll}
                  checked={arrayLength > 0 && totalSelected === arrayLength}
                />
              </TableCell>
            )}
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
          ) : arrayLength === 0 ? (
            <TableRow>
              <TableCell colSpan={100}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ py: 2 }}
                >
                  <img src={emptyIcon} alt="" style={{ width: 100 }} />
                  <SubHeader text="Tabel Kosong" />
                </Stack>
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
