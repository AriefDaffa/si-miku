import type { FC } from 'react';

import Box from '@mui/material/Box';

import QuarterCard from '@/presentation/page-component/common/QuarterCard';
import type { GetMajorNormalizedResult } from '@/controller/pages/IndicatorDetail/types';
import MajorQuarterTable from './MajorQuarterTable';

interface MajorQuarterSectionProps extends GetMajorNormalizedResult {
  indicatorName: string;
  indicatorID: number;
  isEnableEdit?: boolean;
}

const MajorQuarterSection: FC<MajorQuarterSectionProps> = (props) => {
  const {
    indicatorID,
    indicatorName,
    data,
    failed,
    fulfilled,
    notSet,
    isEnableEdit = false,
  } = props;

  return (
    <Box>
      <QuarterCard failed={failed} fulfilled={fulfilled} notSet={notSet} />
      <MajorQuarterTable
        data={data}
        isEnableEdit={isEnableEdit}
        indicatorID={indicatorID}
        indicatorName={indicatorName}
      />
    </Box>
  );
};

export default MajorQuarterSection;
