import { noop } from 'lodash';
import type { FC, ReactNode, ChangeEvent } from 'react';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Table as MuiTable } from '@mui/material';

import emptyIcon from '@/assets/logo/empty.png';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

import TableLoader from './TableLoader';

interface TableProps {
  isLoading: boolean;
  arrayLength: number;
  header: string[];
  children: ReactNode;
  withCheckbox?: boolean;
  checkboxId?: number;
  totalSelected?: number;
  onSelectAll?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Table: FC<TableProps> = (props) => {
  const {
    header,
    children,
    isLoading,
    arrayLength,
    checkboxId,
    withCheckbox = false,
    totalSelected = 0,
    onSelectAll = noop,
  } = props;

  return (
    <TableContainer>
      <MuiTable sx={{ overflowX: 'auto' }}>
        <TableHead sx={{ borderTop: '1px solid rgba(224, 224, 224, 1);' }}>
          <TableRow>
            {withCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  id={`checkbox-${checkboxId}`}
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
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
