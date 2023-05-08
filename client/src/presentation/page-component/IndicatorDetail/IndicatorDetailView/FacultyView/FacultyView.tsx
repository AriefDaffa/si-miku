import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import type { GetMajorNormalizedResult } from '@/controller/pages/IndicatorDetail/types';

import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import FacultyInputDialog from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputDialog/FacultyInputDialog';

interface FacultyViewProps {
  indicatorID: number;
  indicatorName: string;
}

const FacultyView: FC<FacultyViewProps> = (props) => {
  const { indicatorID, indicatorName } = props;

  const [openMajorDialog, setOpenMajorDialog] = useState(false);

  const handleOpen = () => {
    setOpenMajorDialog(true);
  };

  return (
    <Box>
      <IndicatorDetailInputButton onInputClick={handleOpen} />
      <FacultyInputDialog
        open={openMajorDialog}
        setOpen={setOpenMajorDialog}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
      />
    </Box>
  );
};

export default FacultyView;
