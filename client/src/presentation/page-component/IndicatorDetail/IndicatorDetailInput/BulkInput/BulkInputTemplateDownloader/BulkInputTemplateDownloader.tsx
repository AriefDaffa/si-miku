import type { FC, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import {
  PRIMARY,
  SECONDARY,
} from '@/presentation/global-component/theme/Colors';
import { SubHeader } from '@/presentation/global-component/UI/Typography';

interface BulkInputTemplateDownloaderProps {}

const BulkInputTemplateDownloader: FC<BulkInputTemplateDownloaderProps> = (
  props
) => {
  const {} = props;

  return (
    <Box>
      <SubHeader text="Template Excel" sx={{ pb: 1 }} />
      <Box>
        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: SECONDARY.main,
            color: 'black',
            ':hover': { backgroundColor: SECONDARY.main },
          }}
        >
          Dowload Template
        </Button>
      </Box>
    </Box>
  );
};

export default BulkInputTemplateDownloader;
