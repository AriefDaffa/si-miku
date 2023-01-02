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
import type { tableContentProps } from './types';

const TableContent: FC<tableContentProps> = (props) => {
  const { content, headerTitle } = props;

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
      {headerTitle.map(
        (data, idx) =>
          data.value && (
            <TableCell key={idx} sx={idx === 1 ? { maxWidth: '300px' } : {}}>
              {data.value === 'status' ? (
                <Pill
                  text={content[data.value]}
                  isError={
                    content[data.value] === 'Belum Memenuhi' ? true : false
                  }
                />
              ) : (
                content[data.value]
              )}
            </TableCell>
          )
      )}
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
