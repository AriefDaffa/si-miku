import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

import { Header } from '@/presentation/global-component/UI/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface MajorTableHeadProps {
  enableCheckbox: boolean;
  isAllChecked: boolean;
  handleSelectAll: (e: any) => void;
}

const MajorTableHead: FC<MajorTableHeadProps> = (props) => {
  const { isAllChecked, handleSelectAll, enableCheckbox } = props;

  return (
    <TableRow sx={{ backgroundColor: PRIMARY.main }}>
      {enableCheckbox && (
        <TableCell>
          <Checkbox
            onClick={handleSelectAll}
            checked={isAllChecked}
            sx={{
              color: 'white',
              p: 0,
              '&.Mui-checked': {
                color: 'white',
              },
            }}
          />
        </TableCell>
      )}
      <TableCell>
        <Header variant="subtitle2" text="No." sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Kode" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Nama Indikator"
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
        <Header variant="subtitle2" text="Progress" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Status" sx={{ color: 'white' }} />
      </TableCell>
    </TableRow>
  );
};

export default MajorTableHead;
