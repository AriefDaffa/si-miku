import { noop } from 'lodash';
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
  handleOpenBulk: () => void;
  isFaculty?: boolean;
}

const IndicatorDetailInputButton: FC<IndicatorDetailInputButtonProps> = (
  props
) => {
  const { onInputClick, handleOpenBulk, isFaculty = false } = props;

  return (
    <Stack>
      <Stack flexDirection="row-reverse" gap={1}>
        {!isFaculty && (
          <Button
            variant="outlined"
            startIcon={<ArticleIcon />}
            onClick={handleOpenBulk}
            sx={{
              float: 'right',
              borderColor: SECONDARY.main,
              color: 'black',
              backgroundColor: SECONDARY.main,
              ':hover': {
                color: 'black',
                backgroundColor: SECONDARY.main,
                borderColor: SECONDARY.main,
              },
            }}
          >
            Input Data (Bulk)
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={onInputClick}
          sx={{
            float: 'right',
            borderColor: PRIMARY.main,
            color: 'white',
            backgroundColor: PRIMARY.main,
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
    </Stack>
  );
};

export default IndicatorDetailInputButton;
