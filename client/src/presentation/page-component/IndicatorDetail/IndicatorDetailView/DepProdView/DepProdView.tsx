import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import MajorQuarterSection from '@/presentation/page-component/IndicatorDetail/IndicatorDetailQuarterSection/MajorQuarterSection';
import DepartmentQuarterSection from '@/presentation/page-component/IndicatorDetail/IndicatorDetailQuarterSection/DepartmentQuarterSection';
import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import MajorInputDialog from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputDialog/MajorInputDialog';
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
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpenMajorDialog(true);
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
            <IndicatorDetailInputButton onInputClick={handleOpen} />
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
      <MajorInputDialog
        open={openMajorDialog}
        setOpen={setOpenMajorDialog}
        indicatorName={indicatorName}
        indicatorID={indicatorID}
        major={majorData.data}
      />
    </Box>
  );
};

export default DepProdView;
