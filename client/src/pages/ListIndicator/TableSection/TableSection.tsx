import { useMemo } from 'react';
import type { FC } from 'react';

import { Box, Card } from '@mui/material';

import Table from '@/components/Table';
import type { IndicatorByYearNormalized } from '@/repository/query/IndicatorByYearQuery/types';

import TableToolbar from './TableToolbar';

interface TableSectionProps {
  indicatorData: IndicatorByYearNormalized;
  isIndicatorLoading: boolean;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;

  const headerTitle = [
    { title: 'ID', value: 'indicatorId' },
    { title: 'Nama Indikator', value: 'indicatorName' },
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
          isLoading={isIndicatorLoading}
          content={indicatorData.indicator}
        />
      </Box>
    </Card>
  );
};

export default TableSection;
