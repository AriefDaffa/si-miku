import { useFieldArray } from 'react-hook-form';
import { split } from 'lodash';
import { useState } from 'react';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

import CustomCard from '@/components/UI/CustomCard';
import CustomGrid from '@/components/UI/CustomGrid';
import LoadingPopup from '@/components/UI/Loader/LoadingPopup';
import DialogPopup from '@/components/UI/DialogPopup';
import { Header, SubHeader } from '@/components/UI/Typography';
import { SelectInput, TextInput } from '@/components/UI/Input';

interface JurusanCardInputProps {
  index: number;
  control: Control<any, any>;
}

const JurusanCardInput: FC<JurusanCardInputProps> = (props) => {
  const { control, index } = props;

  const [openLoading, setOpenLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `indicator_data[${index}]`,
  });

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const addSection = () => {
    // append({  });
  };

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between">
        <Header text={`Data indikator jurusan ${''}`} variant="subtitle1" />
        <IconButton onClick={() => remove(index)} sx={{ padding: 0 }}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default JurusanCardInput;
