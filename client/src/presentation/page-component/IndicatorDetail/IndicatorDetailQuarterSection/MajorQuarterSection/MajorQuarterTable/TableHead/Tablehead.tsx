import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Header } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface TableHeadProps {
  isEnableEdit?: boolean;
}

const TableHead: FC<TableHeadProps> = (props) => {
  const { isEnableEdit = false } = props;

  return (
    <TableRow sx={{ backgroundColor: PRIMARY.main }}>
      <TableCell>
        <Header variant="subtitle2" text="No." sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Program Studi"
          sx={{ color: 'white' }}
        />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Q1" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Q2" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Q3" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Q4" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Target" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Status" sx={{ color: 'white' }} />
      </TableCell>
      {isEnableEdit && <TableCell></TableCell>}
    </TableRow>
  );
};

export default TableHead;
