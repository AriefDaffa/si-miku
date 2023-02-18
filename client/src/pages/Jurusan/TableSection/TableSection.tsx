import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import tifLogo from '@/assets/logo-jurusan/tif-logo.png';
import siLogo from '@/assets/logo-jurusan/si-logo.png';
import tekkomLogo from '@/assets/logo-jurusan/tekkom-logo.png';
import ptiLogo from '@/assets/logo-jurusan/pti-logo.png';
import tiLogo from '@/assets/logo-jurusan/ti-logo.png';
import mikLogo from '@/assets/logo-jurusan/mik-logo.png';
import { Header, SubHeader } from '@/components/Typography';
import { getPercentage } from '@/utils/get-percentage';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';
import { GREY } from '@/theme/Colors';
import CustomTable from '@/components/CustomTable';
import { tableHeader } from './constant';
import ProgressBar from './ProgressBar';

interface TableSectionProps {
  isLoading: boolean;
  majorData: MajorOverviewNormalized[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { majorData, isLoading } = props;

  const navigate = useNavigate();

  return (
    <CustomGrid
      sx={{ pt: 2 }}
      gridItem={[
        <CustomCard sx={{ overflowX: 'auto' }}>
          <Box sx={{ pb: 3 }}>
            <Header text="Tabel jurusan" variant="h6" />
            <SubHeader text="Pilih salah satu untuk melihat detail dari jurusan" />
          </Box>
          <Divider sx={{ width: '100%' }} />
          <CustomTable
            header={tableHeader}
            isLoading={isLoading}
            arrayLength={majorData.length}
          >
            {majorData.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() => navigate(`${item.majorId}`)}
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
                    text={`${item.total.fulfilled}`}
                  />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.total.failed}`} />
                </TableCell>
                <TableCell>
                  <ProgressBar
                    value={
                      getPercentage(
                        item.total.fulfilled,
                        item.total.fulfilled + item.total.failed
                      ) || 0
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </CustomTable>
        </CustomCard>,
      ]}
    />
  );
};

export default TableSection;
