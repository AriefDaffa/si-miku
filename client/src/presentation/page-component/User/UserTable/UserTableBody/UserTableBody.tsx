import { useState } from 'react';
import type { FC, MouseEvent } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Popover from '@/presentation/global-component/UI/Popover';
import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import type { UserListNormalized } from '@/repository/query/user/UserQuery';

import UserEditDialog from './UserEditDialog';
import UserDeleteDialog from './UserDeleteDialog';

interface UserTableBodyProps {
  index: number;
  item: UserListNormalized;
}

const UserTableBody: FC<UserTableBodyProps> = (props) => {
  const { item, index } = props;

  const [openPopover, setOpenPopover] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(e.currentTarget);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  return (
    <TableRow
      sx={{ ':hover': { backgroundColor: GREY[300], cursor: 'pointer' } }}
    >
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
      {/* <TableCell>
        <Header variant="subtitle2" text={`Level ${item.role.roleID}`} />
      </TableCell> */}
      <TableCell>
        <Header variant="subtitle2" text={`${item.userEmail}`} />
      </TableCell>
      {/* <TableCell onClick={(e) => e.stopPropagation()}>
        <IconButton onClick={handleOpenPopover}>
          <MoreVertIcon />
        </IconButton>
        <UserEditDialog open={openEdit} setOpen={setOpenEdit} {...item} />
        <UserDeleteDialog open={openDelete} setOpen={setOpenDelete} {...item} />
        <Popover openThreedots={openPopover} setOpenThreedots={setOpenPopover}>
          <MenuItem onClick={handleOpenEdit}>
            <EditIcon sx={{ mr: 1 }} />
            <Header text="Edit" variant="body2" />
          </MenuItem>
          <MenuItem onClick={handleOpenDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} />
            <Header text="Delete" variant="body2" />
          </MenuItem>
        </Popover>
      </TableCell> */}
    </TableRow>
  );
};

export default UserTableBody;
