import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

import YearPicker from '@/components/UI/atoms/YearPicker/YearPicker';
import type { MajorOverviewNormalized } from '@/repository/query/major/MajorQuery';

interface MajorFilterProps {
  currentMajor: number;
  selectedYear: string;
  view: number;
  major: MajorOverviewNormalized[];
  setView: Dispatch<SetStateAction<number>>;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  setCurrentMajor: Dispatch<SetStateAction<number>>;
}

const MajorFilter: FC<MajorFilterProps> = (props) => {
  const {
    currentMajor,
    major,
    setCurrentMajor,
    selectedYear,
    setSelectedYear,
    setView,
    view,
  } = props;

  const [openThreedots, setOpenThreedots] = useState<any>(null);
  const [openInput, setOpenInput] = useState<any>(null);

  return (
    <>
      <Stack direction={{ sm: 'row' }} gap={1}>
        <FormControl fullWidth>
          <InputLabel>Program Studi</InputLabel>
          <Select
            label="Program Studi"
            value={currentMajor}
            size="small"
            sx={{ py: 0.4, backgroundColor: 'white' }}
            // onChange={() => setCurrentMajor()}
          >
            {major.map((item) => (
              <MenuItem
                value={item.majorID}
                key={item.majorID}
                onClick={() => setCurrentMajor(item.majorID)}
              >
                <Stack flexDirection="row" alignItems="center">
                  <ListItemText primary={item.majorName} />
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth>
          <Select label="" value={view} size="small" sx={{ py: 0.5 }}>
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
        </FormControl>*/}
        <YearPicker
          label="Tahun"
          setYearValue={setSelectedYear}
          yearValue={selectedYear}
        />
      </Stack>
    </>
  );
};

export default MajorFilter;
