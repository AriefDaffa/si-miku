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
          <Table sx={{ minWidth: 1050 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <SubHeader text="No." />
                </TableCell>
                <TableCell>
                  <SubHeader text="Jurusan" />
                </TableCell>
                <TableCell>
                  <SubHeader text="Indikator memenuhi target" />
                </TableCell>
                <TableCell>
                  <SubHeader text="Indikator belum memenuhi target" />
                </TableCell>
                <TableCell>
                  <SubHeader text="Progress" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {majorData.map((data, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                  }}
                  onClick={() => navigate(`${data.majorId}`)}
                >
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${idx + 1}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header variant="subtitle2" text={`${data.majorName}`} />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.totalFulfilled}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Header variant="subtitle2" text={`${data.totalFailed}`} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={
                            getPercentage(
                              data.totalFulfilled,
                              data.totalFulfilled + data.totalFailed
                            ) || 0
                          }
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Header
                          variant="subtitle2"
                          text={`${
                            getPercentage(
                              data.totalFulfilled,
                              data.totalFulfilled + data.totalFailed
                            ) || 0
                          }%`}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={majorD}
            rowsPerPage={6}
            page={1}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          /> */}
        </CustomCard>,
      ]}
    />
  );
};

export default TableSection;
