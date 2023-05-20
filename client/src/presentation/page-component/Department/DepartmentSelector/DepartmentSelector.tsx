import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';

import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import type { IndicatorListNormalized } from '@/repository/query/department/DepartmentQuery';

interface DepartmentSelectorProps {
  imageURL: string;
  isLoading: boolean;
  currentDepartment: number;
  department: IndicatorListNormalized[];
  onChange: (e: SelectChangeEvent) => void;
}

const DepartmentSelector: FC<DepartmentSelectorProps> = (props) => {
  const { imageURL, isLoading, currentDepartment, department, onChange } =
    props;

  return (
    <Stack sx={{ mb: 1 }}>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 1 }}
      >
        <Avatar
          src={imageURL}
          alt="tif"
          variant="rounded"
          sx={{ width: 'fit-content' }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Stack flexDirection="column">
          <SubHeader text="Departemen" />
          {isLoading ? (
            <Skeleton />
          ) : (
            <FormControl fullWidth>
              <Select
                label=""
                labelId="demo-simple-select-label"
                value={String(currentDepartment)}
                onChange={onChange}
                size="small"
                sx={{
                  '& > fieldset': { border: 'none' },
                }}
                SelectDisplayProps={{ style: { padding: '0 36px 0 0' } }}
              >
                {department.map((item) => (
                  <MenuItem value={item.departmentID} key={item.departmentID}>
                    <Header text={item.departmentName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DepartmentSelector;
