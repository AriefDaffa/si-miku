import { useState, Fragment, useMemo } from 'react';
import type { FC, SyntheticEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import Pill from '@/presentation/global-component/UI/Pill';
import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { getPercentage } from '@/controller/utils/get-percentage';
import { getProgressColor } from '@/controller/utils/get-progress-bar-color';
import type { IndicatorDepartmentListNormalized } from '@/repository/query/department/DepartmentById';

import DepartmentTableDialog from './DepartmentTableDialog';

interface DepartmentTableBodyProps extends IndicatorDepartmentListNormalized {
  index: number;
  enableCheckbox: boolean;
  currentYear: number;
  imageURL: string;
  selected: IndicatorDepartmentListNormalized[];
  onCheckboxClick: (
    e: SyntheticEvent<HTMLButtonElement>,
    item: IndicatorDepartmentListNormalized
  ) => void;
}

const DepartmentTableBody: FC<DepartmentTableBodyProps> = (props) => {
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
          <Header
            variant="body2"
            text={`${item.targetQuarter.q1}`}
            sx={{ textAlign: 'center' }}
          />
        </TableCell>
        <TableCell>
          <Header
            variant="body2"
            text={`${item.targetQuarter.q2}`}
            sx={{ textAlign: 'center' }}
          />
        </TableCell>
        <TableCell>
          <Header
            variant="body2"
            text={`${item.targetQuarter.q3}`}
            sx={{ textAlign: 'center' }}
          />
        </TableCell>
        <TableCell>
          <Header
            variant="body2"
            text={`${item.targetQuarter.q4}`}
            sx={{ textAlign: 'center' }}
          />
        </TableCell>
        <TableCell>
          <Header
            variant="body2"
            text={`${item.targetQuarter.targetValue}`}
            sx={{ textAlign: 'center' }}
          />
        </TableCell>
        <TableCell sx={{ backgroundColor: getProgressColor(percentage) }}>
          <Header
            variant="body2"
            text={`${percentage}%`}
            sx={{ textAlign: 'center' }}
          />
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
      <DepartmentTableDialog
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

export default DepartmentTableBody;
