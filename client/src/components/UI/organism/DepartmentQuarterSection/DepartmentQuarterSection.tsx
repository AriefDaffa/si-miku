import type { FC } from 'react';

import Box from '@mui/material/Box';

import QuarterCard from '@/components/UI/molecules/QuarterCard';
import type { GetDepartmentNormalizedResult } from '@/pages/Indicator/IndicatorDetail/types';

import DepartmentQuarterTable from './DepartmentQuarterTable';

interface DepartmentQuarterSectionProps extends GetDepartmentNormalizedResult {
  indicatorName: string;
  indicatorID: number;
  isEnableEdit?: boolean;
}

const DepartmentQuarterSection: FC<DepartmentQuarterSectionProps> = (props) => {
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
      <DepartmentQuarterTable
        data={data}
        isEnableEdit={isEnableEdit}
        indicatorID={indicatorID}
        indicatorName={indicatorName}
      />
    </Box>
  );
};

export default DepartmentQuarterSection;
