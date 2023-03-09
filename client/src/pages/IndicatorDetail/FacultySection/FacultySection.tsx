import type { FC } from 'react';

import Box from '@mui/material/Box';

import TableCard from '@/components/UI/molecules/TableCard';
import ChartCard from '@/components/UI/molecules/ChartCard';
import type { IndicatorByIdDataNormalized } from '@/repository/query/IndicatorByIdQuery';

interface FacultySectionProps {
  isLoading: boolean;
  data: IndicatorByIdDataNormalized;
}

const FacultySection: FC<FacultySectionProps> = (props) => {
  const { data, isLoading } = props;

  return (
    <Box>
      <ChartCard
        indicatorData={data.facultyIndicators.data}
        isIndicatorLoading={isLoading}
      />
      <TableCard
        indicatorCode={data.indicatorCode}
        indicatorID={data.indicatorID}
        indicatorName={data.indicatorName}
        isLoading={isLoading}
        data={data.facultyIndicators.data}
      />
    </Box>
  );
};

export default FacultySection;
