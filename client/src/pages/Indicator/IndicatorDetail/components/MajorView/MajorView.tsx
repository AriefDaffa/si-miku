import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import MajorInputDialog from '@/components/UI/molecules/MajorInputDialog';
import MajorQuarterSection from '@/components/UI/organism/MajorQuarterSection';
import { SubHeader } from '@/components/UI/atoms/Typography';
import type { GetMajorNormalizedResult } from '@/pages/Indicator/IndicatorDetail/types';

interface MajorViewProps {
  indicatorID: number;
  indicatorName: string;
  majorData: GetMajorNormalizedResult;
}

const MajorView: FC<MajorViewProps> = (props) => {
  const { indicatorID, indicatorName, majorData } = props;

  const [openMajorDialog, setOpenMajorDialog] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <SubHeader
        text="Data dibawah merupakan penjabaran data pada tiap Jurusan. Untuk mengubah data diatas, silahkan ubah data dibawah ini"
        sx={{ textAlign: 'center' }}
      />
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Jurusan" />
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

export default MajorView;
