import { useMemo } from 'react';
import type { FC } from 'react';

import { Box, Card } from '@mui/material';

import Table from '@/components/Table';

import TableToolbar from './TableToolbar';
import type { IndicatorResponseNormalized } from '@/repository/query/IndicatorQuery/types';

interface TableSectionProps {
  isLoading: boolean;
  data: IndicatorResponseNormalized[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { data, isLoading } = props;

  const headerTitle = [
    { title: 'ID Indikator', value: 'indicatorID' },
    { title: 'Nama Indikator', value: 'indicatorName' },
    { title: 'Menu', value: '' },
  ];

  // @TODO Add pagination (low prio)
  return (
    <Card sx={{ mt: 2 }}>
      <TableToolbar />
      <Box sx={{ overflowX: 'auto' }}>
        <Table headerTitle={headerTitle} isLoading={isLoading} content={data} />
      </Box>
    </Card>
  );
};

export default TableSection;
