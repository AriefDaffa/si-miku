import { Fragment, useState } from 'react';
import type { FC, MouseEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Pill from '@/presentation/global-component/UI/Pill';
import Popover from '@/presentation/global-component/UI/Popover';
import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

import DepartmentEditDialog from './DepartmentEditDialog';
import DepartmentDeleteDialog from './DepartmentDeleteDialog';

interface TableItemProps extends IndicatorDepartmentsNormalized {
  index: number;
  indicatorID: number;
  indicatorName: string;
  isEnableEdit?: boolean;
}

const TableItem: FC<TableItemProps> = (props) => {
  const {
    index,
    indicatorID,
    indicatorName,
    isEnableEdit = false,
    ...rest
  } = props;

  const [openEditDialog, setopenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState<any>(null);

  const handleOpenDialog = () => {
    setOpenPopover(null);
    setopenEditDialog(true);
  };

  const handleOpenDeleteDialog = () => {
    setOpenPopover(null);
    setOpenDeleteDialog(true);
  };

  const handleOpenPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(e.currentTarget);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: 'white',
        ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
      }}
    >
      <TableCell>
        <Header variant="body2" text={`${index + 1}`} />
      </TableCell>
      <TableCell>
        <Stack flexDirection="row" alignItems="center">
          <img
            src={rest.department.departmentImage}
            alt=""
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
          <Header
            variant="body2"
            text={rest.department.departmentName}
            sx={{ ml: 1 }}
          />
        </Stack>
      </TableCell>
      {rest.targetDeps.map((el) => (
        <Fragment key={el.targetDepID}>
          <TableCell>
            <Header variant="body2" text={`${el.targetQuarter.q1}`} />
          </TableCell>
          <TableCell>
            <Header variant="body2" text={`${el.targetQuarter.q2}`} />
          </TableCell>
          <TableCell>
            <Header variant="body2" text={`${el.targetQuarter.q3}`} />
          </TableCell>
          <TableCell>
            <Header variant="body2" text={`${el.targetQuarter.q4}`} />
          </TableCell>
          <TableCell>
            <Header variant="body2" text={`${el.targetQuarter.targetValue}`} />
          </TableCell>
          <TableCell>
            <Pill
              isNotAdded={el.targetQuarter.year.yearID === 0}
              isError={el.targetQuarter.isTargetFulfilled === false}
            >
              <Header
                variant="subtitle2"
                text={`${
                  el.targetQuarter.year.yearID === 0
                    ? 'Belum ditambahkan'
                    : el.targetQuarter.isTargetFulfilled === true
                    ? 'Memenuhi'
                    : 'Belum Memenuhi'
                }`}
              />
            </Pill>
          </TableCell>
          {isEnableEdit && (
            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
              <IconButton
                size="large"
                color="inherit"
                disabled={el.targetQuarter.year.yearID === 0}
                onClick={handleOpenPopover}
              >
                <MoreVertIcon />
              </IconButton>
              <DepartmentEditDialog
                indicatorID={indicatorID}
                indicatorName={indicatorName}
                open={openEditDialog}
                setOpen={setopenEditDialog}
                {...rest}
              />
              <DepartmentDeleteDialog
                indicatorID={indicatorID}
                indicatorName={indicatorName}
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                {...rest}
              />
              <Popover
                openThreedots={openPopover}
                setOpenThreedots={setOpenPopover}
              >
                <MenuItem onClick={handleOpenDialog}>
                  <EditIcon sx={{ mr: 1 }} />
                  <Header text="Edit" variant="body2" />
                </MenuItem>
                <MenuItem
                  onClick={handleOpenDeleteDialog}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  <Header text="Delete" variant="body2" />
                </MenuItem>
              </Popover>
            </TableCell>
          )}
        </Fragment>
      ))}
    </TableRow>
  );
};

export default TableItem;
