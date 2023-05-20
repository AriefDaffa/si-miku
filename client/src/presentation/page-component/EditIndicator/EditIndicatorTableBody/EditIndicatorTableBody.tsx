import type { FC } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Header } from '@/presentation/global-component/UI/Typography';
import { GREY } from '@/presentation/global-component/theme/Colors';
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
      <TableCell align="center">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        {/* <Popover
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
        </Popover> */}
      </TableCell>
    </TableRow>
  );
};

export default EditIndicatorTableBody;
