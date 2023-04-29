import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';

import DepartmentInputDialog from '@/components/UI/molecules/DepartmentInputDialog';
import {
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';
import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface DepartmentInputButtonProps {
  indicatorID: number;
  indicatorName: string;
  data: IndicatorDepartmentsNormalized[];
}

const DepartmentInputButton: FC<DepartmentInputButtonProps> = (props) => {
  const { data, indicatorID, indicatorName } = props;

  const [openInput, setOpenInput] = useState(false);

  const handleOpenInputDialog = () => {
    setOpenInput(true);
  };

  return (
    <Stack>
      <Stack flexDirection="row-reverse" gap={1} sx={{ mt: 2 }}>
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
      <DepartmentInputDialog
        open={openInput}
        setOpen={setOpenInput}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
        department={data}
      />
    </Stack>
  );
};

export default DepartmentInputButton;
