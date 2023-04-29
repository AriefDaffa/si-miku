import { useNavigate } from 'react-router-dom';
import type { FC, SyntheticEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import Pill from '@/components/UI/atoms/Pill';
import { Header } from '@/components/UI/atoms/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import type { TargetQuarterTableDataArray } from '../types';

interface TableItemProps extends TargetQuarterTableDataArray {
  index: number;
  enableCheckbox: boolean;
  selected: TargetQuarterTableDataArray[];
  handleCheckboxClick: (
    e: SyntheticEvent<HTMLButtonElement>,
    item: TargetQuarterTableDataArray
  ) => void;
}

const TableItem: FC<TableItemProps> = (props) => {
  const { index, enableCheckbox, handleCheckboxClick, selected, ...item } =
    props;

  const navigate = useNavigate();

  const onClickCheckbox = (e: any) => {
    handleCheckboxClick(e, item);
  };

  const handleNavigate = () => {
    navigate(`/dashboard/indicator/${item.indicatorID}`);
  };

  const isChecked =
    selected.map((data) => data.indicatorID).indexOf(item.indicatorID) !== -1;

  return (
    <TableRow
      onClick={enableCheckbox ? onClickCheckbox : handleNavigate}
      sx={{
        backgroundColor: isChecked ? GREY[300] : 'white',
        ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
      }}
    >
      {enableCheckbox && (
        <TableCell>
          <Checkbox onClick={onClickCheckbox} checked={isChecked} />
        </TableCell>
      )}
      <TableCell>
        <Header variant="body2" text={`${index + 1}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={item.indicatorCode} />
      </TableCell>
      <TableCell>
        <Header
          variant="body2"
          text={item.indicatorName}
          sx={{ width: '100%', maxWidth: '320px' }}
        />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.dataQuarter.q1}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.dataQuarter.q2}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.dataQuarter.q3}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.dataQuarter.q4}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.dataQuarter.targetValue}`} />
      </TableCell>
      <TableCell>
        <Pill
          isNotAdded={item.dataQuarter.yearID === 0}
          isError={item.dataQuarter.isTargetFulfilled === false}
        >
          <Header
            variant="subtitle2"
            text={`${
              item.dataQuarter.yearID === 0
                ? 'Belum ditambahkan'
                : item.dataQuarter.isTargetFulfilled === true
                ? 'Memenuhi'
                : 'Belum Memenuhi'
            }`}
          />
        </Pill>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
