import type { FC } from 'react';

import Card from '@mui/material/Card';

import Table from '@/presentation/global-component/UI/Table';
import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

import TableItem from './TableItem';
import TableHead from './TableHead';

interface DepartmentQuarterTableProps {
  indicatorID: number;
  indicatorName: string;
  data: IndicatorDepartmentsNormalized[];
  isEnableEdit?: boolean;
}

const DepartmentQuarterTable: FC<DepartmentQuarterTableProps> = (props) => {
  const { indicatorID, indicatorName, data, isEnableEdit = false } = props;

  return (
    <Card>
      <Table
        headComponent={<TableHead isEnableEdit={isEnableEdit} />}
        bodyComponent={data.map((item, idx) => (
          <TableItem
            key={item.indicatorDepartmentID}
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            index={idx}
            isEnableEdit={isEnableEdit}
            {...item}
          />
        ))}
      />
    </Card>
  );
};

export default DepartmentQuarterTable;
