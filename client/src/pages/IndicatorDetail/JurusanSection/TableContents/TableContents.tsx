import { useState } from 'react';
import type { FC, Dispatch, SyntheticEvent, SetStateAction } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Pill from '@/components/Pill';
import { GREY } from '@/theme/Colors';
import { Header, SubHeader } from '@/components/Typography';
import type { IndicatorDataNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import DeleteButton from '../DeleteButton';

interface JurusanSectionProps {
  index: number;
  selected: number[];
  data: IndicatorDataNormalized;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { data, index, selected, setSelected } = props;

  const handleCheckboxClick = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();

    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <TableRow
      sx={{
        ':hover': {
          backgroundColor: GREY[300],
          cursor: 'pointer',
        },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected.indexOf(data.indicatorMajorYearId) !== -1}
          onClick={(e) => handleCheckboxClick(e, data.indicatorMajorYearId)}
        />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${index + 1}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Header
          variant="subtitle2"
          text={`${data.year.yearValue}`}
          sx={{ py: 1 }}
        />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${data.q1}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${data.q2}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${data.q3}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${data.q4}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${data.target}`} sx={{ py: 1 }} />
      </TableCell>
      <TableCell>
        <Pill isError={data.isTargetFulfilled === false}>
          <Header
            variant="subtitle2"
            text={`${
              data.isTargetFulfilled === true ? 'Memenuhi' : 'Belum Memenuhi'
            }`}
          />
        </Pill>
      </TableCell>
      <TableCell>
        <DeleteButton
          id={data.indicatorMajorYearId}
          setSelected={setSelected}
        />
      </TableCell>
    </TableRow>
  );
};

export default JurusanSection;
