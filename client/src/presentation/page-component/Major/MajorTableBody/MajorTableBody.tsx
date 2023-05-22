import { useState, Fragment, useMemo } from 'react';
import type { FC, SyntheticEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import Pill from '@/presentation/global-component/UI/Pill';
import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { getPercentage } from '@/controller/utils/get-percentage';
import type { MajorListNormalized } from '@/repository/query/major/MajorByIdQuery';

import MajorTableDialog from './MajorTableDialog';

interface MajorTableBodyProps extends MajorListNormalized {
  index: number;
  enableCheckbox: boolean;
  currentYear: number;
  imageURL: string;
  selected: MajorListNormalized[];
  onCheckboxClick: (
    e: SyntheticEvent<HTMLButtonElement>,
    item: MajorListNormalized
  ) => void;
}

const MajorTableBody: FC<MajorTableBodyProps> = (props) => {
  const {
    index,
    currentYear,
    enableCheckbox,
    onCheckboxClick,
    imageURL,
    selected,
    ...item
  } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const onClickCheckbox = (e: any) => {
    onCheckboxClick(e, item);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isChecked =
    selected.map((data) => data.indicatorID).indexOf(item.indicatorID) !== -1;

  const normalizeDepartmentTargetVal = useMemo(() => {
    return {
      targetValue: item.targetQuarter.targetValue,
      q1: item.targetQuarter.q1,
      q2: item.targetQuarter.q2,
      q3: item.targetQuarter.q3,
      q4: item.targetQuarter.q4,
      targetQuarterID: item.targetQuarter.targetQuarterID,
      isTargetFulfilled: item.targetQuarter.isTargetFulfilled,
      year: {
        yearID: item.targetQuarter.yearID,
        yearValue: currentYear,
      },
    };
  }, [item, currentYear]);

  const percentage = useMemo(() => {
    const data = getPercentage(
      item.targetQuarter.q1 +
        item.targetQuarter.q2 +
        item.targetQuarter.q3 +
        item.targetQuarter.q4,
      item.targetQuarter.targetValue
    );

    return data > 100 ? 100 : data;
  }, [item]);

  return (
    <Fragment>
      <TableRow
        onClick={enableCheckbox ? onClickCheckbox : handleOpenDialog}
        sx={{
          backgroundColor: isChecked ? GREY[300] : 'white',
          ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
        }}
      >
        {enableCheckbox && (
          <TableCell>
            <Checkbox
              onClick={onClickCheckbox}
              checked={isChecked}
              sx={{ p: 0 }}
            />
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
          <Header variant="body2" text={`${item.targetQuarter.q1}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${item.targetQuarter.q2}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${item.targetQuarter.q3}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${item.targetQuarter.q4}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${item.targetQuarter.targetValue}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${percentage}%`} />
        </TableCell>
        <TableCell>
          <Pill
            isNotAdded={item.targetQuarter.yearID === 0}
            isError={item.targetQuarter.isTargetFulfilled === false}
          >
            <Header
              variant="subtitle2"
              text={`${
                item.targetQuarter.yearID === 0
                  ? 'Belum ditambahkan'
                  : item.targetQuarter.isTargetFulfilled === true
                  ? 'Memenuhi'
                  : 'Belum Memenuhi'
              }`}
            />
          </Pill>
        </TableCell>
      </TableRow>
      <MajorTableDialog
        currentYear={currentYear}
        imageURL={imageURL}
        indicatorID={item.indicatorID}
        indicatorName={item.indicatorName}
        openDialog={openDialog}
        onClose={handleCloseDialog}
        targetQuarter={normalizeDepartmentTargetVal}
      />
    </Fragment>
  );
};

export default MajorTableBody;
