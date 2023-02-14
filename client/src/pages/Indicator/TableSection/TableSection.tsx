import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import CustomGrid from '@/components/CustomGrid';
import CustomCard from '@/components/CustomCard';
import CustomTable from '@/components/CustomTable';
import { Header, SubHeader } from '@/components/Typography';
import { GREY } from '@/theme/Colors';
import type { IndicatorResponseNormalized } from '@/repository/query/IndicatorQuery/types';

import TableToolbar from './TableToolbar';
import DeleteButton from './DeleteButton';
import { tableHeader } from './constant';

interface TableSectionProps {
  isLoading: boolean;
  data: IndicatorResponseNormalized[];
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { data, isLoading } = props;

  const navigate = useNavigate();

  // @TODO Add pagination (low prio)
  return (
    <CustomGrid
      sx={{ pt: 2 }}
      gridItem={[
        <CustomCard sx={{ overflowX: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Header text="List Indikator" variant="h6" />
            <SubHeader text="Pilih salah satu indikator dibawah untuk melihat perkembangan indikator tersebut" />
          </Box>
          <CustomTable header={tableHeader} isLoading={isLoading}>
            {data.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                }}
                onClick={() =>
                  navigate(`/dashboard/indicator/${item.indicatorID}`, {
                    replace: true,
                  })
                }
              >
                <TableCell>
                  <Header variant="subtitle2" text={`${idx + 1}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.indicatorCode}`} />
                </TableCell>
                <TableCell>
                  <Header variant="subtitle2" text={`${item.indicatorName}`} />
                </TableCell>
                <TableCell>
                  <DeleteButton id={item.indicatorID} />
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
