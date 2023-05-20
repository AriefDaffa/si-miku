import type { FC } from 'react';

import Card from '@mui/material/Card';

import Table from '@/presentation/global-component/UI/Table';
import type { IndicatorMajorsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

import TableItem from './TableItem';
import TableHead from './TableHead';

interface MajorQuarterTableProps {
  indicatorID: number;
  indicatorName: string;
  data: IndicatorMajorsNormalized[];
  isEnableEdit?: boolean;
}

const MajorQuarterTable: FC<MajorQuarterTableProps> = (props) => {
  const { indicatorID, indicatorName, data, isEnableEdit = false } = props;

  return (
    <Card>
      <Table
        headComponent={<TableHead isEnableEdit={isEnableEdit} />}
        bodyComponent={data.map((item, idx) => (
          <TableItem
            key={item.indicatorMajorID}
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

export default MajorQuarterTable;
