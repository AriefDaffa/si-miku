import type { FC } from 'react';

import { Box, Card } from '@mui/material';

import Table from '@/components/Table';
import type { IndicatorByIdResponseNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import TableToolbar from './TableToolbar';

interface TableSectionProps {
  indicator: IndicatorByIdResponseNormalized;
  isLoading: boolean;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { indicator, isLoading } = props;

  const headerTitle = [
    // { title: 'No', value: '' },
    { title: 'Tahun', value: 'yearId' },
    { title: 'Target', value: 'target' },
    { title: 'Kuartil 1', value: 'quarterOne' },
    { title: 'Kuartil 2', value: 'quarterTwo' },
    { title: 'Kuartil 3', value: 'quarterThree' },
    { title: 'Kuartil 4', value: 'quarterFour' },
    { title: 'Status', value: 'status' },
    { title: '', value: '' },
  ];

  return (
    <Card>
      <TableToolbar />
      <Box sx={{ overflowX: 'auto' }}>
        <Table
          headerTitle={headerTitle}
          isLoading={isLoading}
          content={indicator.years}
        />
      </Box>
    </Card>
  );
};

export default TableSection;
