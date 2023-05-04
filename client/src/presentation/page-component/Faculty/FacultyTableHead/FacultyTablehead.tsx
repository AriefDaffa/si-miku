import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

import { Header } from '@/components/UI/atoms/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface FacultyTableHeadProps {
  enableCheckbox: boolean;
  isAllChecked: boolean;
  handleSelectAll: (e: any) => void;
}

const FacultyTableHead: FC<FacultyTableHeadProps> = (props) => {
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
        <Header variant="subtitle2" text="Kuartil 1" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Kuartil 2" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Kuartil 3" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Kuartil 4" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Target" sx={{ color: 'white' }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text="Status" sx={{ color: 'white' }} />
      </TableCell>
    </TableRow>
  );
};

export default FacultyTableHead;
