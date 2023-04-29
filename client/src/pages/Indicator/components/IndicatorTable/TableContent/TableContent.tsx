import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import type { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useUpdateIndicatorTypeMutation from '@/repository/mutation/UpdateIndicatorTypeMutation';
import { GREY } from '@/presentation/global-component/theme/Colors';
import { Header } from '@/components/UI/atoms/Typography';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';

import EditDialog from './EditDialog';

interface TableContentProps {
  index: number;
  selected: number[];
  item: IndicatorListNormalized;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleCheckboxClick: (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => void;
}

const TableContent: FC<TableContentProps> = (props) => {
  const { item, index, handleCheckboxClick, selected, setLoading } = props;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useUpdateIndicatorTypeMutation(item.indicatorID);

  const [openThreedots, setOpenThreedots] = useState<any>(null);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [checkboxOne, setCheckboxOne] = useState(
    item.indicatorType === 2 || item.indicatorType === 4
  );
  const [checkboxTwo, setcheckboxTwo] = useState(
    item.indicatorType === 3 || item.indicatorType === 4
  );

  const handleCheckboxOne = () => {
    setCheckboxOne(!checkboxOne);

    let type = 1;

    if (!checkboxOne === true && checkboxTwo === true) {
      type = 4;
    } else if (!checkboxOne === true && checkboxTwo === false) {
      type = 2;
    } else if (!checkboxOne === false && checkboxTwo === true) {
      type = 3;
    }

    const payload = {
      indicator_type: type,
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          // setSuccessDialog(true);
          setLoading(false);

          queryClient.invalidateQueries('indicator-list');
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleCheckboxTwo = () => {
    setcheckboxTwo(!checkboxTwo);

    let type = 1;

    if (checkboxOne === true && !checkboxTwo === true) {
      type = 4;
    } else if (checkboxOne === true && !checkboxTwo === false) {
      type = 2;
    } else if (checkboxOne === false && !checkboxTwo === true) {
      type = 3;
    }

    const payload = {
      indicator_type: type,
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          // setSuccessDialog(true);
          setLoading(false);
          queryClient.invalidateQueries('indicator-list');
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  // --- Three dots handler --- //
  const handleCloseMenu = () => {
    setOpenThreedots(null);
  };

  const handleOpenMenu = (e: SyntheticEvent<HTMLButtonElement>) => {
    setOpenThreedots(e.currentTarget);
  };
  // --- --- --- --- --- --- //

  // --- Edit dialog handler --- //
  const handleOpenEditDialog = () => {
    setopenEditDialog(true);
    handleCloseMenu();
  };
  // --- --- --- --- --- --- //

  return (
    <TableRow
      onClick={() => navigate(`/dashboard/indicator/${item.indicatorID}`)}
      sx={{
        ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
      }}
    >
      <TableCell>
        <Checkbox
          onClick={(e) => handleCheckboxClick(e, item.indicatorID)}
          checked={selected.indexOf(item.indicatorID) !== -1}
        />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={`${index + 1}`} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={item.indicatorCode} />
      </TableCell>
      <TableCell>
        <Header variant="body2" text={item.indicatorName} />
      </TableCell>
      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <Checkbox id={`checkbox-${index}-1`} disabled checked />
      </TableCell>
      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          id={`checkbox-${index}-2`}
          checked={checkboxOne}
          onChange={handleCheckboxOne}
        />
      </TableCell>
      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          id={`checkbox-${index}-3`}
          checked={checkboxTwo}
          onChange={handleCheckboxTwo}
        />
      </TableCell>
      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
        <EditDialog
          item={item}
          open={openEditDialog}
          setOpen={setopenEditDialog}
        />
        <Popover
          open={Boolean(openThreedots)}
          anchorEl={openThreedots}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem onClick={handleOpenEditDialog}>
            <EditIcon sx={{ mr: 1 }} />
            <Header text="Edit" variant="body2" />
          </MenuItem>
          <MenuItem sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} />
            <Header text="Delete" variant="body2" />
          </MenuItem>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default TableContent;
