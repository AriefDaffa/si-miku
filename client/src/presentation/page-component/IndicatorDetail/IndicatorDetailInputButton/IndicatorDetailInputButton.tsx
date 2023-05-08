import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';

import {
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';

interface IndicatorDetailInputButtonProps {
  onInputClick: () => void;
}

const IndicatorDetailInputButton: FC<IndicatorDetailInputButtonProps> = (
  props
) => {
  const { onInputClick } = props;

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
          onClick={onInputClick}
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
      {/* <MajorInputDialog
        open={openInput}
        setOpen={setOpenInput}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
        major={data}
      /> */}
    </Stack>
  );
};

export default IndicatorDetailInputButton;
