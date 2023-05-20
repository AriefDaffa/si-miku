import { noop } from 'lodash';
import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Table from '@/presentation/global-component/UI/Table';
import Grid from '@/presentation/global-component/UI/Grid/Grid';

interface TableContainerProps {
  headComponent: ReactNode;
  bodyComponent: ReactNode;
  paginationComponent: ReactNode;
  enableCheckbox?: boolean;
  onExport?: () => void;
  selectedData?: number;
}

const TableContainer: FC<TableContainerProps> = (props) => {
  const {
    bodyComponent,
    headComponent,
    paginationComponent,
    selectedData = 0,
    enableCheckbox = false,
    onExport = noop,
  } = props;

  return (
    <Fragment>
      {enableCheckbox && (
        <Card
          sx={{
            backgroundColor: '#E5F6FD',
            border: '1px solid #dadada',
            mb: 1,
          }}
        >
          <Grid
            sx={{ mb: 1 }}
            spacing={1}
            gridItem={[
              <Alert severity="info">
                <Box>
                  {selectedData > 0
                    ? `${selectedData} data terpilih`
                    : 'Silahkan pilih data yang akan di export menggunakan checkbox dibawah'}
                </Box>
              </Alert>,
              <Box sx={{ px: 1, width: '100%' }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={selectedData === 0}
                  onClick={onExport}
                >
                  Export Data
                </Button>
              </Box>,
            ]}
          />
        </Card>
      )}
      <Card sx={{ border: '1px solid #dadada' }}>
        <Table headComponent={headComponent} bodyComponent={bodyComponent} />
        {paginationComponent}
      </Card>
    </Fragment>
  );
};

export default TableContainer;
