import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import CustomCard from '@/components/UI/CustomCard';
import CustomTable from '@/components/UI/CustomTable';
import LoadingPopup from '@/components/UI/Loader/LoadingPopup';
import { GREY } from '@/components/theme/Colors';
import { Header, SubHeader } from '@/components/UI/Typography';
import type {
  IndicatorByIdNormalized,
  IndicatorDataNormalized,
  MajorsNormalized,
} from '@/repository/query/IndicatorByIdQuery/types';

import FormDialog from './FormDialog';
import TableContents from './TableContents';
import DeleteBulkButton from './DeleteBulkButton';
import {
  DialogFullValue,
  DialogStateDefaultValue,
  tableHeader,
} from './constant';
import type { DialogFullVal, DialogStateTypes } from './types';
import FullScreenDialog from './FullScreenDialog';

interface JurusanSectionProps {
  isIndicatorLoading: boolean;
  indicatorData: IndicatorByIdNormalized;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;

  const [selected, setSelected] = useState<number[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState<DialogStateTypes>(
    DialogStateDefaultValue
  );
  const [openFullDialog, setopenFullDialog] =
    useState<DialogFullVal>(DialogFullValue);

  const handleOpenDialog = (major: MajorsNormalized) => {
    setOpenDialog({ state: true, major });
  };

  const handleCloseDialog = () => {
    setOpenDialog(DialogStateDefaultValue);
  };

  const handleSelectAllClick = (
    e: ChangeEvent<HTMLInputElement>,
    data: IndicatorDataNormalized[]
  ) => {
    if (e.target.checked) {
      const newSelecteds = data.map((item) => item.indicatorMajorYearId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <CustomCard>
      <Box>
        <Header text="Data indikator pada jurusan" />
        <SubHeader text="Menampilkan data indikator pada seluruh jurusan" />
      </Box>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <Box sx={{ mb: 2 }}>
          {indicatorData.indicatorMajors.map((item, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <CustomCard>
                <Stack
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Avatar
                    src={item.major.majorImage}
                    alt="tif"
                    variant="rounded"
                    sx={{ width: 'fit-content' }}
                  />
                  <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                  <Header text={item.major.majorName} />
                </Stack>
                <CustomTable
                  withCheckbox
                  checkboxId={idx}
                  header={tableHeader}
                  isLoading={isIndicatorLoading}
                  arrayLength={item.indicatorData.length}
                  totalSelected={selected.length}
                  onSelectAll={(e) =>
                    handleSelectAllClick(e, item.indicatorData)
                  }
                >
                  {item.indicatorData
                    .sort((a, b) => a.year.yearValue - b.year.yearValue)
                    .map((data, index) => (
                      <TableContents
                        key={index}
                        data={data}
                        index={index}
                        major={item.major}
                        indicatorName={indicatorData.indicatorName}
                        selected={selected}
                        setSelected={setSelected}
                        setOpenFullDialog={setopenFullDialog}
                      />
                    ))}
                </CustomTable>
                <Box sx={{ float: 'right', my: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDialog(item.major)}
                    sx={{ mr: 1 }}
                  >
                    Input Data
                  </Button>
                  <DeleteBulkButton
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </CustomCard>
            </Box>
          ))}
          <FormDialog
            open={openDialog.state}
            major={openDialog.major}
            handleClose={handleCloseDialog}
            setOpenLoading={setOpenLoading}
          />
          <LoadingPopup open={openLoading} />
          <FullScreenDialog
            openFullDialog={openFullDialog}
            setOpenFullDialog={setopenFullDialog}
          />
        </Box>
      </Box>
    </CustomCard>
  );
};

export default JurusanSection;
