import { useState } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';

import FacultyInputDialog from '@/components/UI/molecules/FacultyInputDialog';
import {
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';
import type { IndicatorFacultiesNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface FacultyInputButtonProps {
  indicatorID: number;
  indicatorName: string;
  data: IndicatorFacultiesNormalized[];
}

const FacultyInputButton: FC<FacultyInputButtonProps> = (props) => {
  const { indicatorID, indicatorName } = props;

  const [openInput, setOpenInput] = useState(false);

  const handleOpenInputDialog = () => {
    setOpenInput(true);
  };

  return (
    <Stack>
      <Stack flexDirection="row-reverse" gap={1}>
        <Button
          variant="outlined"
          startIcon={<ArticleIcon />}
          // onClick={handleOpenInputDialog}
          sx={{
            float: 'right',
            borderColor: SECONDARY.main,
            color: 'black',
            backgroundColor: SECONDARY.main,
            // borderRadius: 2,
            ':hover': {
              color: 'black',
              backgroundColor: SECONDARY.main,
              borderColor: SECONDARY.main,
            },
          }}
        >
          Input Data (Bulk)
        </Button>
        <Button
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={handleOpenInputDialog}
          sx={{
            float: 'right',
            borderColor: PRIMARY.main,
            color: 'white',
            backgroundColor: PRIMARY.main,
            // borderRadius: 2,
            ':hover': {
              color: 'white',
              backgroundColor: PRIMARY.main,
              borderColor: PRIMARY.main,
            },
          }}
        >
          Input Data
        </Button>
      </Stack>
      <FacultyInputDialog
        open={openInput}
        setOpen={setOpenInput}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
      />
    </Stack>
  );
};

export default FacultyInputButton;
