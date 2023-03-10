import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import Table from '@/components/UI/atoms/Table';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { getPercentage } from '@/utils/get-percentage';
import { GREY } from '@/components/theme/Colors';

import { tableHeader } from './constant';
import ProgressBar from './ProgressBar';
import { OverviewMajorNormalized } from '@/repository/query/OverviewMajorQuery';

interface TableSectionProps {
  isLoading: boolean;
  majorData: OverviewMajorNormalized;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { majorData, isLoading } = props;

  const navigate = useNavigate();

  return (
    <Grid
      sx={{ pt: 2 }}
      gridItem={[
        <Card sx={{ overflowX: 'auto' }}>
          <Box sx={{ pb: 3 }}>
            <Header text="Tabel jurusan" variant="h6" />
            <SubHeader text="Pilih salah satu untuk melihat detail dari jurusan" />
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Table
            header={tableHeader}
            isLoading={isLoading}
            arrayLength={majorData.majorList.length}
          >
            {majorData.majorList.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() => navigate(`${item.majorID}`)}
              >
                <TableCell>
                  <Header
                    variant="subtitle2"
                    text={`${idx + 1}`}
                    sx={{ py: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.majorName}`} />
                </TableCell>
                <TableCell>
                  <Header
                    variant="subtitle2"
                    text={`${item.count.fulfilled}`}
                  />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.count.failed}`} />
                </TableCell>
                <TableCell>
                  <ProgressBar
                    value={
                      getPercentage(
                        item.count.fulfilled,
                        item.count.fulfilled + item.count.failed
                      ) || 0
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>,
      ]}
    />
  );
};

export default TableSection;
