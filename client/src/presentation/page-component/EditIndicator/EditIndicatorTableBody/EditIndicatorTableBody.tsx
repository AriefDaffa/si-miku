import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useState } from 'react';
import type { FC, SyntheticEvent, ChangeEvent } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import Table from '@/components/UI/atoms/Table';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { getProgressColor } from '@/controller/utils/get-progress-bar-color';
import { getPercentage } from '@/controller/utils/get-percentage';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

interface EditIndicatorTableBodyProps {
  index: number;
  item: IndicatorListNormalized;
  handleDepartmentCheckbox: (item: IndicatorListNormalized) => void;
  handleMajorCheckbox: (item: IndicatorListNormalized) => void;
}

const EditIndicatorTableBody: FC<EditIndicatorTableBodyProps> = (props) => {
  const { item, index, handleDepartmentCheckbox, handleMajorCheckbox } = props;

  const handleDepartmentClick = () => {
    handleDepartmentCheckbox(item);
  };

  const handleMajorClick = () => {
    handleMajorCheckbox(item);
  };

  return (
    <TableRow
      sx={{
        ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
      }}
      // onClick={() => handleCheckboxClick(item.userID)}
    >
      {/* <TableCell padding="checkbox">
        <Checkbox
          // checked={selected.indexOf(item.userID) !== -1}
          // onClick={() => handleCheckboxClick(item.userID)}
        />
      </TableCell> */}
      <TableCell>
        <Header variant="subtitle2" text={`${index + 1}`} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${item.indicatorCode}`} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${item.indicatorName}`} />
      </TableCell>
      <TableCell align="center">
        <Checkbox checked disabled />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={item.indicatorType === 2 || item.indicatorType === 4}
          onClick={handleDepartmentClick}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={item.indicatorType === 3 || item.indicatorType === 4}
          onClick={handleMajorClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default EditIndicatorTableBody;
