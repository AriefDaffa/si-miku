import { useNavigate } from 'react-router-dom';
import { Fragment, useState, useMemo } from 'react';
import type { FC, MouseEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Popover from '@/presentation/global-component/UI/Popover';
import Pill from '@/presentation/global-component/UI/Pill';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { Header } from '@/presentation/global-component/UI/Typography';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { defaultTargetQuarter } from '@/controller/constant/default-target-quarter';
import { useAuthContext } from '@/controller/context/AuthContext';
import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

import MajorEditDialog from './MajorEditDialog';
import MajorDeleteDialog from './MajorDeleteDialog';
import MajorQuarterDialog from './MajorQuarterDialog';

interface TableItemProps extends IndicatorMajorsNormalized {
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

  const { currentYear } = useCurrentYear();
  const { roleID } = useAuthContext();

  const [openEditDialog, setopenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDetailDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDialog(false);
  };

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

  const targetQuarterData = useMemo(() => {
    const data = rest.targetMajors[0];

    if (data) {
      return data.targetQuarter;
    } else {
      return defaultTargetQuarter;
    }
  }, [currentYear, rest.targetMajors[0]]);

  return (
    <Fragment>
      <TableRow
        sx={{
          backgroundColor: 'white',
          ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
        }}
        onClick={handleOpenDetailDialog}
      >
        <TableCell>
          <Header variant="body2" text={`${index + 1}`} />
        </TableCell>
        <TableCell>
          <Stack flexDirection="row" alignItems="center">
            <img
              src={rest.major.majorImage}
              alt=""
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
              }}
            />
            <Header
              variant="body2"
              text={rest.major.majorName}
              sx={{ ml: 1 }}
            />
          </Stack>
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${targetQuarterData.q1}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${targetQuarterData.q2}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${targetQuarterData.q3}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${targetQuarterData.q4}`} />
        </TableCell>
        <TableCell>
          <Header variant="body2" text={`${targetQuarterData.targetValue}`} />
        </TableCell>
        <TableCell>
          <Pill
            isNotAdded={targetQuarterData.year.yearID === 0}
            isError={targetQuarterData.isTargetFulfilled === false}
          >
            <Header
              variant="subtitle2"
              text={`${
                targetQuarterData.year.yearID === 0
                  ? 'Belum ditambahkan'
                  : targetQuarterData.isTargetFulfilled === true
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
              disabled={targetQuarterData.year.yearID === 0 || roleID !== 2}
              onClick={handleOpenPopover}
            >
              <MoreVertIcon />
            </IconButton>
            <MajorEditDialog
              indicatorID={indicatorID}
              indicatorName={indicatorName}
              open={openEditDialog}
              setOpen={setopenEditDialog}
              {...rest}
            />
            <MajorDeleteDialog
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
      </TableRow>
      <MajorQuarterDialog
        currentYear={Number(currentYear || 0)}
        imageURL={rest.major.majorImage}
        majorName={rest.major.majorName}
        indicatorName={indicatorName}
        openDialog={openDialog}
        onClose={handleCloseDetailDialog}
        targetQuarter={targetQuarterData}
      />
    </Fragment>
  );
};

export default TableItem;
