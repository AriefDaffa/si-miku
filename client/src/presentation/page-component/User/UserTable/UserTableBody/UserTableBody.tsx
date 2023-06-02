import type { FC } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
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
          <Header variant="subtitle2" text={`${item.profession}`} />
        </Stack>
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`${item.role.roleName}`} />
      </TableCell>
      <TableCell>
        <Header variant="subtitle2" text={`Level ${item.role.roleID}`} />
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
