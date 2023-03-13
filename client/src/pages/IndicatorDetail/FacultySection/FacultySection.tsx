import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TableCard from '@/components/UI/molecules/TableCard';
import ChartCard from '@/components/UI/molecules/ChartCard';
import type { IndicatorByIdDataNormalized } from '@/repository/query/IndicatorByIdQuery';
import InputDataIndicator from './InputDataIndicator';

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
        TambahDataComponent={
          <InputDataIndicator indicatorID={data.indicatorID} />
        }
      />
    </Box>
  );
};

export default FacultySection;
