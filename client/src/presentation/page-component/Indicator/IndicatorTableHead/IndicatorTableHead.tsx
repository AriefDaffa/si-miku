import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

import { Header } from '@/components/UI/atoms/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface IndicatorTableHeadProps {
  enableCheckbox: boolean;
  isAllChecked: boolean;
  handleSelectAll: (e: any) => void;
}

const IndicatorTableHead: FC<IndicatorTableHeadProps> = (props) => {
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
        <Header
          variant="subtitle2"
          text="Kode Indikator"
          sx={{ color: 'white' }}
        />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Nama Indikator"
          sx={{ color: 'white' }}
        />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Fakultas"
          sx={{ color: 'white', textAlign: 'center' }}
        />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Departemen"
          sx={{ color: 'white', textAlign: 'center' }}
        />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text="Program Studi"
          sx={{ color: 'white', textAlign: 'center' }}
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default IndicatorTableHead;
