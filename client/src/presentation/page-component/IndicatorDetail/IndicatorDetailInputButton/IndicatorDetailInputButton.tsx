import { noop } from 'lodash';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  ERROR,
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';
import { useAuthContext } from '@/controller/context/AuthContext';

interface IndicatorDetailInputButtonProps {
  onInputClick: () => void;
  handleOpenBulk: () => void;
  isFaculty?: boolean;
  facultyEnable?: boolean;
  onDeleteClick?: () => void;
}

const IndicatorDetailInputButton: FC<IndicatorDetailInputButtonProps> = (
  props
) => {
  const {
    onInputClick,
    handleOpenBulk,
    isFaculty = false,
    facultyEnable = false,
    onDeleteClick = noop,
  } = props;

  const { roleID } = useAuthContext();

  return (
    <Stack>
      {roleID === 2 && (
        <Stack flexDirection="row-reverse" gap={1}>
          {isFaculty && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={onDeleteClick}
              disabled={facultyEnable}
              sx={{
                float: 'right',
                borderColor: ERROR.main,
                color: 'white',
                backgroundColor: ERROR.main,
                ':hover': {
                  color: 'white',
                  backgroundColor: ERROR.main,
                  borderColor: ERROR.main,
                },
              }}
            >
              Hapus Data
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<ArticleIcon />}
            onClick={handleOpenBulk}
            disabled={facultyEnable}
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
            {isFaculty ? 'Edit Indikator' : 'Input Data (Bulk)'}
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
      )}
    </Stack>
  );
};

export default IndicatorDetailInputButton;
