import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface DepartmentPickerProps {
  currentDepartment: number;
  department: IndicatorDepartmentsNormalized[];
  setCurrentDepartment: Dispatch<SetStateAction<number>>;
}

const DepartmentPicker: FC<DepartmentPickerProps> = (props) => {
  const { currentDepartment, department, setCurrentDepartment } = props;

  const handleChangeDepartment = (e: SelectChangeEvent) => {
    setCurrentDepartment(Number(e.target.value));
  };

  return (
    <FormControl fullWidth>
      {/* <InputLabel id="test-select-label">Departemen</InputLabel> */}
      <Select
        label=""
        labelId="demo-simple-select-label"
        value={String(currentDepartment)}
        onChange={handleChangeDepartment}
        size="small"
        sx={{ py: 0.4 }}
      >
        {department.map((item) => (
          <MenuItem
            value={item.department.departmentID}
            key={item.indicatorDepartmentID}
          >
            <Stack flexDirection="row" alignItems="center">
              <ListItemIcon sx={{ mr: 1 }}>
                <img
                  src={item.department.departmentImage}
                  alt=""
                  style={{ width: 40, objectFit: 'cover' }}
                />
              </ListItemIcon>
              <ListItemText primary={item.department.departmentName} />
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DepartmentPicker;
