import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

import YearPicker from '@/components/UI/atoms/YearPicker/YearPicker';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { IndicatorListDataNormalized } from '@/repository/query/department/DepartmentQuery';

interface DepartmentFilterProps {
  currentDepartment: number;
  selectedYear: string;
  view: number;
  department: IndicatorListDataNormalized[];
  setView: Dispatch<SetStateAction<number>>;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  setCurrentDepartment: Dispatch<SetStateAction<number>>;
}

const DepartmentFilter: FC<DepartmentFilterProps> = (props) => {
  const {
    currentDepartment,
    department,
    setCurrentDepartment,
    selectedYear,
    setSelectedYear,
    setView,
    view,
  } = props;

  return (
    <>
      <Stack flexDirection="row" gap={1}>
        <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
          <InputLabel>Departemen</InputLabel>
          <Select
            label="Departemen"
            value={currentDepartment}
            size="small"
            sx={{
              py: 0.5,
            }}
            // onChange={() => setCurrentDepartment()}
          >
            {department.map((item) => (
              <MenuItem
                value={item.departmentID}
                key={item.departmentID}
                onClick={() => setCurrentDepartment(item.departmentID)}
              >
                <Stack flexDirection="row" alignItems="center">
                  <ListItemText primary={item.departmentName} />
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
          <Select
            label=""
            value={view}
            size="small"
            sx={{
              py: 0.5,
            }}
          >
            <MenuItem value={1} onClick={() => setView(1)}>
              <ListItemText primary="Tampilkan seluruh data" />
            </MenuItem>
            <MenuItem value={2} onClick={() => setView(2)}>
              <ListItemText primary="Memenuhi" />
            </MenuItem>
            <MenuItem value={3} onClick={() => setView(3)}>
              <ListItemText primary="Belum Memenuhi" />
            </MenuItem>
            <MenuItem value={4} onClick={() => setView(4)}>
              <ListItemText primary="Belum Ditambahkan" />
            </MenuItem>
          </Select>
        </FormControl> */}
        <YearPicker
          label=""
          setYearValue={setSelectedYear}
          yearValue={selectedYear}
        />
      </Stack>
    </>
  );
};

export default DepartmentFilter;
