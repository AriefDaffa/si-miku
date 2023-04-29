import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import MajorQuarterSection from '@/components/UI/organism/MajorQuarterSection';
import DepartmentQuarterSection from '@/components/UI/organism/DepartmentQuarterSection';
import { SubHeader } from '@/components/UI/atoms/Typography';
import type {
  GetDepartmentNormalizedResult,
  GetMajorNormalizedResult,
} from '@/pages/Indicator/IndicatorDetail/types';

interface DepProdViewProps {
  indicatorID: number;
  indicatorName: string;
  majorData: GetMajorNormalizedResult;
  departmentData: GetDepartmentNormalizedResult;
}

const DepProdView: FC<DepProdViewProps> = (props) => {
  const { indicatorID, indicatorName, majorData, departmentData } = props;

  // dialog state
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
            <MajorQuarterSection
              {...majorData}
              isEnableEdit
              indicatorID={indicatorID}
              indicatorName={indicatorName}
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
    </Box>
  );
};

export default DepProdView;
