import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import FacultyInput from '@/controller/pages/IndicatorDetail/InputController/FormInput/FacultyInput';

import type { GetFacultyNormalizedResult } from '@/controller/pages/IndicatorDetail/types';

import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';

interface FacultyViewProps {
  indicatorID: number;
  indicatorName: string;
  facultyData: GetFacultyNormalizedResult;
}

const FacultyView: FC<FacultyViewProps> = (props) => {
  const { indicatorID, indicatorName, facultyData } = props;

  const [openMajorDialog, setOpenMajorDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpen = () => {
    setOpenMajorDialog(true);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <Box>
      <IndicatorDetailInputButton
        isFaculty
        facultyEnable={facultyData.notSet > 0}
        onInputClick={handleOpen}
        handleOpenBulk={handleEdit}
        onDeleteClick={handleDelete}
      />
      <FacultyInput
        open={openMajorDialog}
        setOpen={setOpenMajorDialog}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
      />
      <EditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        indicatorID={indicatorID}
        indicatorName={indicatorName}
        {...facultyData?.data[0]}
      />
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        indicatorID={indicatorID}
        indicatorName={indicatorName}
        {...facultyData?.data[0]}
      />
    </Box>
  );
};

export default FacultyView;
