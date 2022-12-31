import type { FC } from 'react';

import { Box, Table, TableBody, Card } from '@mui/material';

import useIndicatorByYear from '@/repository/query/IndicatorByYearQuery';
import type { YearData } from '@/repository/query/YearQuery/types';

import TableHeader from './TableHeader';
import TableContent from './TableContent';
import TableToolbar from './TableToolbar';
import TableLoader from './TableLoader';

interface TableSectionProps {
  currentYear: string;
  year: YearData[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { currentYear, year } = props;

  const { data, isLoading } = useIndicatorByYear(
    currentYear,
    currentYear !== ''
  );

  return (
    <Card>
      <TableToolbar yearData={year} />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1050 }}>
          <TableHeader />
          <TableBody>
            {!isLoading ? (
              data.indicator.map((item, idx) => (
                <TableContent
                  key={idx}
                  ID={item.indicatorId}
                  name={item.indicatorName}
                  q1={item.quarterOne}
                  q2={item.quarterTwo}
                  q3={item.quarterThree}
                  q4={item.quarterFour}
                  target={item.target}
                />
              ))
            ) : (
              <>
                <TableLoader />
                <TableLoader />
                <TableLoader />
              </>
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default TableSection;
