import { useMemo } from 'react';
import type { FC } from 'react';

import {
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Pill from '@/components/Pill';

interface TableContentProps {
  ID: number;
  name: string;
  target: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const TableContent: FC<TableContentProps> = (props) => {
  const { ID, name, target, q1, q2, q3, q4 } = props;

  const status = useMemo(() => {
    const result = q1 + q2 + q3 + q4 >= target ? 'Memenuhi' : 'Belum Memenuhi';

    return result;
  }, [q1, q2, q3, q4, target]);

  return (
    <TableRow
      hover
      //   selected={selectedCustomerIds.indexOf(customer.id) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
        //   checked={selectedCustomerIds.indexOf(customer.id) !== -1}
        //   onChange={(event) => handleSelectOne(event, customer.id)}
        //   value="true"
        />
      </TableCell>
      <TableCell>{ID}</TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1">
          {name}
        </Typography>
      </TableCell>
      <TableCell>{target}</TableCell>
      <TableCell>{q1}</TableCell>
      <TableCell>{q2}</TableCell>
      <TableCell>{q3}</TableCell>
      <TableCell>{q4}</TableCell>
      <TableCell>
        <Pill
          text={status}
          isError={status === 'Belum Memenuhi' ? true : false}
        />
      </TableCell>
      <TableCell>
        <IconButton
          // onClick={onOpenNav}
          sx={{ color: 'text.primary' }}
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableContent;
