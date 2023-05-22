import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import type { FC, SyntheticEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import Pill from '@/presentation/global-component/UI/Pill';
import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import type { FakultasIndikatorNormalized } from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import { getPercentage } from '@/controller/utils/get-percentage';

interface FacultyTableBodyProps extends FakultasIndikatorNormalized {
  index: number;
  enableCheckbox: boolean;
  selected: FakultasIndikatorNormalized[];
  onCheckboxClick: (
    e: SyntheticEvent<HTMLButtonElement>,
    item: FakultasIndikatorNormalized
  ) => void;
}

const FacultyTableBody: FC<FacultyTableBodyProps> = (props) => {
  const { index, enableCheckbox, onCheckboxClick, selected, ...item } = props;

  const navigate = useNavigate();

  const onClickCheckbox = (e: any) => {
    onCheckboxClick(e, item);
  };

  const handleNavigate = () => {
    navigate(`/dashboard/indicator/${item.indicatorID}`);
  };

  const isChecked =
    selected.map((data) => data.indicatorID).indexOf(item.indicatorID) !== -1;

  const percentage = useMemo(() => {
    const data = getPercentage(
      item.indicatorFaculties.q1 +
        item.indicatorFaculties.q2 +
        item.indicatorFaculties.q3 +
        item.indicatorFaculties.q4,
      item.indicatorFaculties.targetValue
    );

    return data > 100 ? 100 : data;
  }, [item]);

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
        <Header variant="body2" text={`${item.indicatorFaculties.q1}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.indicatorFaculties.q2}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.indicatorFaculties.q3}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${item.indicatorFaculties.q4}`} />
      </TableCell>
      <TableCell>
        <Header
          variant="body2"
          text={`${item.indicatorFaculties.targetValue}`}
        />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${percentage}%`} />
      </TableCell>
      <TableCell>
        <Pill
          isNotAdded={item.indicatorFaculties.yearID === 0}
          isError={item.indicatorFaculties.isTargetFulfilled === false}
        >
          <Header
            variant="subtitle2"
            text={`${
              item.indicatorFaculties.yearID === 0
                ? 'Belum ditambahkan'
                : item.indicatorFaculties.isTargetFulfilled === true
                ? 'Memenuhi'
                : 'Belum Memenuhi'
            }`}
          />
        </Pill>
      </TableCell>
    </TableRow>
  );
};

export default FacultyTableBody;
