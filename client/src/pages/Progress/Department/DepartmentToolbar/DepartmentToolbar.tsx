import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import type { SelectChangeEvent } from '@mui/material/Select';

import Grid from '@/components/UI/atoms/Grid';
import Accordion from '@/components/UI/atoms/Accordion';
import TextWithSubHeader from '@/components/UI/molecules/TextWithSubHeader';
import EmptyResultCard from '@/components/UI/molecules/EmptyResultCard';
import DepartmentCard from '@/components/UI/organism/department/DepartmentCard';
import MajorCard from '@/components/UI/organism/major/MajorCard';
import MajorInputDialog from '@/components/UI/organism/major/MajorInputDialog';
import type {
  IndicatorByIdDataNormalized,
  IndicatorDepartmentsNormalized,
  IndicatorMajorsNormalized,
} from '@/repository/query/indicator/IndicatorByIdQuery';

import MajorInput from '@/components/UI/organism/major/MajorInput';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { PRIMARY, SUCCESS } from '@/presentation/global-component/theme/Colors';
import Popover from '@/components/UI/atoms/Popover/Popover';
import YearPicker from '@/components/UI/atoms/YearPicker/YearPicker';
import type { IndicatorListDataNormalized } from '@/repository/query/department/DepartmentQuery';

interface DepartmentToolbarProps {
  currentDepartment: number;
  selectedYear: string;
  department: IndicatorListDataNormalized[];
  setSelectedYear: Dispatch<SetStateAction<string>>;
  setCurrentDepartment: Dispatch<SetStateAction<number>>;
}

const DepartmentToolbar: FC<DepartmentToolbarProps> = (props) => {
  const {
    currentDepartment,
    department,
    setCurrentDepartment,
    selectedYear,
    setSelectedYear,
  } = props;

  const [openThreedots, setOpenThreedots] = useState<any>(null);
  const [openInput, setOpenInput] = useState<any>(null);

  return (
    <Stack flexDirection="row-reverse" gap={1}>
      <Box>
        <Button
          variant="outlined"
          onClick={(e) => setOpenThreedots(e.currentTarget)}
          endIcon={<FilterAltIcon />}
          sx={{
            float: 'right',
            mt: 2,
            borderColor: PRIMARY.main,
            color: PRIMARY.main,
            ':hover': {
              color: 'white',
              backgroundColor: PRIMARY.light,
              borderColor: PRIMARY.main,
            },
          }}
        >
          Filter
        </Button>
        <Popover
          isFullWidth
          openThreedots={openThreedots}
          setOpenThreedots={setOpenThreedots}
        >
          <SubHeader text="Tahun" />
          <YearPicker
            label=""
            setYearValue={setSelectedYear}
            yearValue={selectedYear}
          />
          <Divider sx={{ my: 1 }} />

          <SubHeader text="Departemen" sx={{ mb: 1 }} />
          {department.map((item) => (
            <MenuItem
              value={item.departmentID}
              key={item.departmentID}
              onClick={() => setCurrentDepartment(item.departmentID)}
              sx={{
                py: 1,
                backgroundColor:
                  currentDepartment === item.departmentID ? PRIMARY.main : '',
                color: currentDepartment === item.departmentID ? 'white' : '',
                ':hover':
                  currentDepartment === item.departmentID
                    ? { backgroundColor: PRIMARY.main, color: 'white' }
                    : {},
              }}
            >
              <Stack flexDirection="row" alignItems="center">
                <ListItemIcon sx={{ mr: 1 }}>
                  <img
                    src={item.departmentImage}
                    alt=""
                    style={{
                      padding: 1,
                      width: 40,
                      objectFit: 'cover',
                      backgroundColor: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.departmentName} />
              </Stack>
            </MenuItem>
          ))}
        </Popover>
      </Box>
      {/* <Box>
        <Button
          variant="outlined"
          endIcon={<AddCircleOutlineIcon />}
          onClick={(e) => setOpenInput(e.currentTarget)}
          sx={{
            float: 'right',
            mt: 2,
            borderColor: SUCCESS.dark,
            color: SUCCESS.dark,
            ':hover': {
              color: 'white',
              backgroundColor: SUCCESS.dark,
              borderColor: SUCCESS.dark,
            },
          }}
        >
          Tambah Data
        </Button>
        <Popover openThreedots={openInput} setOpenThreedots={setOpenInput}>
          <MenuItem>
            <Stack flexDirection="row" alignItems="center">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Input bulk data" />
            </Stack>
          </MenuItem>
          <MenuItem>
            <Stack flexDirection="row" alignItems="center">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Input single data" />
            </Stack>
          </MenuItem>
        </Popover>
      </Box> */}
    </Stack>
  );
};

export default DepartmentToolbar;
