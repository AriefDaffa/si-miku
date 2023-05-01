import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Card from '@mui/material/Card';

import Table from '@/presentation/global-component/UI/Table';

interface TableContainerProps {
  enableCheckbox: boolean;
  headComponent: ReactNode;
  bodyComponent: ReactNode;
  paginationComponent: ReactNode;
}

const TableContainer: FC<TableContainerProps> = (props) => {
  const { enableCheckbox, bodyComponent, headComponent, paginationComponent } =
    props;

  return (
    <Fragment>
      {/* {enableCheckbox && (
        // <Alert severity="info" sx={{ mb: 2, border: '1px solid #dadada' }}>
        //   {selected.length > 0
        //     ? `${selected.length} data terpilih`
        //     : 'Silahkan pilih data yang akan di export'}
        // </Alert>
      )} */}
      <Card sx={{ border: '1px solid #dadada' }}>
        <Table headComponent={headComponent} bodyComponent={bodyComponent} />
        {paginationComponent}
      </Card>
    </Fragment>
  );
};

export default TableContainer;
