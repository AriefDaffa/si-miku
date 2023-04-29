import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Pill from '@/components/UI/atoms/Pill';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import type { MajorOverviewNormalized } from '@/repository/query/major/MajorQuery';
import Popover from '@/components/UI/atoms/Popover/Popover';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';

interface TableFilterProps {
  view: number;
  setView: Dispatch<SetStateAction<number>>;
}

const TableFilter: FC<TableFilterProps> = (props) => {
  const { setView, view } = props;

  const [openThreedots, setOpenThreedots] = useState<any>(null);

  return (
    <Box>
      <IconButton onClick={(e) => setOpenThreedots(e.currentTarget)}>
        <FilterAltIcon />
      </IconButton>
      <Popover
        isFullWidth
        openThreedots={openThreedots}
        setOpenThreedots={setOpenThreedots}
      >
        <SubHeader text="Filter berdasarkan status data" sx={{ mb: 1 }} />
        <MenuItem
          value={1}
          onClick={() => setView(1)}
          sx={
            view === 1
              ? {
                  border: `1px solid ${PRIMARY.main}`,
                  backgroundColor: GREY[200],
                }
              : {}
          }
        >
          <ListItemText primary="Tampilkan seluruh data" />
        </MenuItem>
        <MenuItem
          value={2}
          onClick={() => setView(2)}
          sx={
            view === 2
              ? {
                  border: `1px solid ${PRIMARY.main}`,
                  backgroundColor: GREY[200],
                }
              : {}
          }
        >
          <Pill isError={false}>
            <Header variant="subtitle2" text={'Memenuhi'} />
          </Pill>
        </MenuItem>
        <MenuItem
          value={3}
          onClick={() => setView(3)}
          sx={
            view === 3
              ? {
                  border: `1px solid ${PRIMARY.main}`,
                  backgroundColor: GREY[200],
                }
              : {}
          }
        >
          <Pill isError={true}>
            <Header variant="subtitle2" text={'Belum Memenuhi'} />
          </Pill>
        </MenuItem>
        <MenuItem
          value={4}
          onClick={() => setView(4)}
          sx={
            view === 4
              ? {
                  border: `1px solid ${PRIMARY.main}`,
                  backgroundColor: GREY[200],
                }
              : {}
          }
        >
          <Pill isError={true} isNotAdded>
            <Header variant="subtitle2" text={'Belum Ditambahkan'} />
          </Pill>
        </MenuItem>
        {/* <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
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
        </FormControl> */}
      </Popover>
    </Box>
  );
};

export default TableFilter;
