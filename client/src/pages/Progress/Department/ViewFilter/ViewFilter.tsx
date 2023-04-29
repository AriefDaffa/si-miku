import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

import type { IndicatorListDataNormalized } from '@/repository/query/department/DepartmentQuery';
import Pill from '@/components/UI/atoms/Pill/Pill';
import { Header } from '@/components/UI/atoms/Typography';

interface ViewFilterProps {
  currentDepartment: number;
  view: number;
  department: IndicatorListDataNormalized[];
  setView: Dispatch<SetStateAction<number>>;
  setCurrentDepartment: Dispatch<SetStateAction<number>>;
}

const ViewFilter: FC<ViewFilterProps> = (props) => {
  const { currentDepartment, department, setCurrentDepartment, setView, view } =
    props;

  return (
    <>
      <Stack flexDirection="row" gap={1}>
        <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
          <InputLabel>Pilih Departemen</InputLabel>
          <Select
            label="Pilih Departemen"
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
        <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
          <InputLabel>Filter data indikator</InputLabel>
          <Select
            label="Filter data indikator"
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
              <Pill isError={false}>
                <Header variant="subtitle2" text={'Memenuhi'} />
              </Pill>
            </MenuItem>
            <MenuItem value={3} onClick={() => setView(3)}>
              <Pill isError={true}>
                <Header variant="subtitle2" text={'Belum Memenuhi'} />
              </Pill>
            </MenuItem>
            <MenuItem value={4} onClick={() => setView(4)}>
              <Pill isError={true} isNotAdded>
                <Header variant="subtitle2" text={'Belum Ditambahkan'} />
              </Pill>
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default ViewFilter;
