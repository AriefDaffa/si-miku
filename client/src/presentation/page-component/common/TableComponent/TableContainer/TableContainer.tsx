import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';

import Table from '@/presentation/global-component/UI/Table';

interface TableContainerProps {
  enableCheckbox: boolean;
  headComponent: ReactNode;
  bodyComponent: ReactNode;
  paginationComponent: ReactNode;
  selectedData?: number;
}

const TableContainer: FC<TableContainerProps> = (props) => {
  const {
    enableCheckbox,
    bodyComponent,
    headComponent,
    paginationComponent,
    selectedData = 0,
  } = props;

  return (
    <Fragment>
      {enableCheckbox && (
        <Alert severity="info" sx={{ mb: 1, border: '1px solid #dadada' }}>
          {selectedData > 0
            ? `${selectedData} data terpilih`
            : 'Silahkan pilih data yang akan di export menggunakan checkbox dibawah'}
        </Alert>
      )}
      <Card sx={{ border: '1px solid #dadada' }}>
        <Table headComponent={headComponent} bodyComponent={bodyComponent} />
        {paginationComponent}
      </Card>
    </Fragment>
  );
};

export default TableContainer;
