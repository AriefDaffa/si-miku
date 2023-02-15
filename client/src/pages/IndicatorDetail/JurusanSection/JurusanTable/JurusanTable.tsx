import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Pill from '@/components/Pill';
import CustomCard from '@/components/CustomCard';
import CustomTable from '@/components/CustomTable';
import { GREY } from '@/theme/Colors';
import { Header } from '@/components/Typography';
import type { IndicatorByIdNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import { tableHeader } from './constant';

interface JurusanTableProps {
  isIndicatorLoading: boolean;
  indicatorData: IndicatorByIdNormalized;
}

const JurusanTable: FC<JurusanTableProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;
  const [selected, setSelected] = useState();

  return (
    <Box sx={{ mb: 2 }}>
      {indicatorData.indicatorMajors.map((item, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <CustomCard>
            <Header text={item.major.majorName} sx={{ mb: 2 }} />
            <CustomTable
              header={tableHeader}
              isLoading={isIndicatorLoading}
              arrayLength={item.indicatorData.length}
            >
              {item.indicatorData.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{
                    ':hover': {
                      backgroundColor: GREY[300],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${index + 1}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.year.yearValue}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.q1}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.q2}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.q3}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.q4}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.target}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Pill isError={data.isTargetFulfilled === false}>
                      <Header
                        variant="subtitle2"
                        text={`${
                          data.isTargetFulfilled === true
                            ? 'Memenuhi'
                            : 'Belum Memenuhi'
                        }`}
                      />
                    </Pill>
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ p: 0 }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </CustomTable>
            <Box sx={{ float: 'right', my: 2 }}>
              <Button variant="outlined">Input Data</Button>
            </Box>
          </CustomCard>
        </Box>
      ))}
    </Box>
  );
};

export default JurusanTable;
