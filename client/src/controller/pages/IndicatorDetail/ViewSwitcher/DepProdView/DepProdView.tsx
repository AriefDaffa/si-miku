import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import MajorInput from '@/controller/pages/IndicatorDetail/InputController/FormInput/MajorInput';
import MajorBulkInput from '@/controller/pages/IndicatorDetail/InputController/BulkInput/MajorBulkInput';
import MajorQuarterSection from '@/presentation/page-component/IndicatorDetail/IndicatorDetailQuarterSection/MajorQuarterSection';
import DepartmentQuarterSection from '@/presentation/page-component/IndicatorDetail/IndicatorDetailQuarterSection/DepartmentQuarterSection';
import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import type {
  GetDepartmentNormalizedResult,
  GetMajorNormalizedResult,
} from '@/controller/pages/IndicatorDetail/types';

interface DepProdViewProps {
  indicatorID: number;
  indicatorName: string;
  majorData: GetMajorNormalizedResult;
  departmentData: GetDepartmentNormalizedResult;
}

const DepProdView: FC<DepProdViewProps> = (props) => {
  const { indicatorID, indicatorName, majorData, departmentData } = props;

  // dialog state
  const [openMajorDialog, setOpenMajorDialog] = useState(false);
  const [openBulkInput, setOpenBulkInput] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpenMajorDialog(true);
  };

  const handleOpenBulk = () => {
    setOpenBulkInput(true);
  };

  return (
    <Box>
      <SubHeader
        text="Data dibawah merupakan penjabaran data pada tiap Jurusan dan Program Studi. Untuk mengubah data diatas, silahkan ubah data dibawah ini"
        sx={{ textAlign: 'center' }}
      />
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Jurusan" />
          <Tab label="Departemen" />
        </Tabs>
        {value === 0 && (
          <Box sx={{ my: 2 }}>
            <Box sx={{ mb: 2 }}>
              <MajorQuarterSection
                {...majorData}
                isEnableEdit
                indicatorID={indicatorID}
                indicatorName={indicatorName}
              />
            </Box>
            <IndicatorDetailInputButton
              onInputClick={handleOpen}
              handleOpenBulk={handleOpenBulk}
            />
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ my: 2 }}>
            <DepartmentQuarterSection
              {...departmentData}
              indicatorID={indicatorID}
              indicatorName={indicatorName}
            />
          </Box>
        )}
      </Box>
      <MajorInput
        open={openMajorDialog}
        setOpen={setOpenMajorDialog}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
        major={majorData.data}
      />
      <MajorBulkInput
        open={openBulkInput}
        setOpen={setOpenBulkInput}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
      />
    </Box>
  );
};

export default DepProdView;
