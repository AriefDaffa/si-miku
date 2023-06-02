import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC, SyntheticEvent, MouseEvent } from 'react';

import Checkbox from '@mui/material/Checkbox';
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
import { useAuthContext } from '@/controller/context/AuthContext';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

import IndicatorEditDialog from './IndicatorEditDialog';
import IndicatorDeleteDialog from './IndicatorDeleteDialog';

interface IndicatorTableBodyProps {
  index: number;
  item: IndicatorListNormalized;
  handleDepartmentCheckbox: (item: IndicatorListNormalized) => void;
  handleMajorCheckbox: (item: IndicatorListNormalized) => void;
}

const IndicatorTableBody: FC<IndicatorTableBodyProps> = (props) => {
  const { item, index, handleDepartmentCheckbox, handleMajorCheckbox } = props;

  const [openPopover, setOpenPopover] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  const { roleID } = useAuthContext();

  const handleDepartmentClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDepartmentCheckbox(item);
  };

  const handleMajorClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleMajorCheckbox(item);
  };

  const handleOpenPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(e.currentTarget);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleNavigate = () => {
    navigate(`/dashboard/indicator/${item.indicatorID}`);
  };

  return (
    <TableRow
      sx={{
        ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
      }}
      onClick={handleNavigate}
    >
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
          disabled={roleID !== 9}
          checked={item.indicatorType === 2 || item.indicatorType === 4}
          onClick={handleDepartmentClick}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={roleID !== 9}
          checked={item.indicatorType === 3 || item.indicatorType === 4}
          onClick={handleMajorClick}
        />
      </TableCell>
      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <IconButton onClick={handleOpenPopover} disabled={roleID !== 9}>
          <MoreVertIcon />
        </IconButton>
        {/* DIALOG */}
        <IndicatorEditDialog open={openEdit} setOpen={setOpenEdit} {...item} />
        <IndicatorDeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          {...item}
        />
        {/* POPOVER */}
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
      </TableCell>
    </TableRow>
  );
};

export default IndicatorTableBody;
