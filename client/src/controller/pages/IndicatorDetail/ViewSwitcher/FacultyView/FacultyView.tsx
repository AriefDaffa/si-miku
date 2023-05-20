import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import FacultyInput from '@/controller/pages/IndicatorDetail/InputController/FormInput/FacultyInput';

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
      <IndicatorDetailInputButton
        isFaculty
        onInputClick={handleOpen}
        handleOpenBulk={() => {}}
      />
      <FacultyInput
        open={openMajorDialog}
        setOpen={setOpenMajorDialog}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
      />
    </Box>
  );
};

export default FacultyView;
