import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import DepartmentQuarterSection from '@/presentation/page-component/IndicatorDetail/IndicatorDetailQuarterSection/DepartmentQuarterSection';
import DepartmentInputDialog from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputDialog/DepartmentInputDialog';
import IndicatorDetailInputButton from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInputButton';
import { SubHeader } from '@/presentation/global-component/UI/Typography';
import type { GetDepartmentNormalizedResult } from '@/controller/pages/IndicatorDetail/types';

interface DepartmentViewProps {
  indicatorID: number;
  indicatorName: string;
  departmentData: GetDepartmentNormalizedResult;
}

const DepartmentView: FC<DepartmentViewProps> = (props) => {
  const { indicatorID, indicatorName, departmentData } = props;

  const [openDepartmentDialog, setopenDepartmentDialog] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setopenDepartmentDialog(true);
  };

  return (
    <Box>
      <SubHeader
        text="Data dibawah merupakan penjabaran data pada tiap Departemen. Untuk mengubah data diatas, silahkan ubah data dibawah ini"
        sx={{ textAlign: 'center' }}
      />
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Departemen" />
        </Tabs>
        {value === 0 && (
          <Box sx={{ my: 2 }}>
            <Box sx={{ mb: 2 }}>
              <DepartmentQuarterSection
                {...departmentData}
                isEnableEdit
                indicatorID={indicatorID}
                indicatorName={indicatorName}
              />
            </Box>
            <IndicatorDetailInputButton onInputClick={handleOpen} />
          </Box>
        )}
      </Box>
      <DepartmentInputDialog
        department={departmentData.data}
        indicatorID={indicatorID}
        indicatorName={indicatorName}
        open={openDepartmentDialog}
        setOpen={setopenDepartmentDialog}
      />
    </Box>
  );
};

export default DepartmentView;
