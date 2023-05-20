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

import Grid from '@/presentation/global-component/UI/Grid';
import Card from '@/presentation/global-component/UI/Card';
import Table from '@/presentation/global-component/UI/Table';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { getProgressColor } from '@/controller/utils/get-progress-bar-color';
import { getPercentage } from '@/controller/utils/get-percentage';
import type { UserListNormalized } from '@/repository/query/user/UserQuery';

interface UserTableBodyProps {
  index: number;
  item: UserListNormalized;
}

const UserTableBody: FC<UserTableBodyProps> = (props) => {
  const { item, index } = props;
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
      <TableCell sx={{ minWidth: '120px' }}>
        <Stack flexDirection="row" alignItems="center" sx={{ gap: 1 }}>
          <Avatar src={item.userImage} />
          <Header variant="subtitle2" text={`${item.userName}`} />
        </Stack>
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${item.userEmail}`} />
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack flexDirection="row">
          {/* <EditButton
                      id={item.userID}
                      indicatorCode={''}
                      indicatorName={''}
                      setSelected={setSelected}
                    /> */}
          {/* <DeleteButton id={item.userID} setSelected={setSelected} /> */}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default UserTableBody;
