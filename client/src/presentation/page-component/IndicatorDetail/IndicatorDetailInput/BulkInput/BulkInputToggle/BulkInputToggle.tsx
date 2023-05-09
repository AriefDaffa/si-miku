import { useState } from 'react';
import { read, utils } from 'xlsx';
import { useQueryClient } from 'react-query';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import YearPicker from '@/presentation/global-component/UI/YearPicker/YearPicker';
import useInputBulkMajorDataMutation from '@/repository/mutation/major/InputBulkMajorDataMutation';
import {
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { SheetJSFT } from '@/controller/constant/sheet';

interface BulkInputToggleProps {
  toggleVal: boolean;
  handleToggleChange: (event: any, newToggle: boolean) => void;
}

const BulkInputToggle: FC<BulkInputToggleProps> = (props) => {
  const { toggleVal, handleToggleChange } = props;

  return (
    <Box>
      <SubHeader text="Replace data" sx={{ pb: 1 }} />
      <ToggleButtonGroup
        color="primary"
        value={toggleVal}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton value={false}>Hanya isi data yang kosong</ToggleButton>
        <ToggleButton value={true}>Replace semua data</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default BulkInputToggle;
