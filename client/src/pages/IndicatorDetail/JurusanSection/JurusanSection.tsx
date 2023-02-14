import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomCard from '@/components/CustomCard';
import CustomTable from '@/components/CustomTable';
import Pill from '@/components/Pill';
import { Header } from '@/components/Typography';
import type { IndicatorByIdNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import { tableHeader } from './constant';
import { GREY } from '@/theme/Colors';

interface JurusanSectionProps {
  indicatorData: IndicatorByIdNormalized;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { indicatorData } = props;

  return (
    <Box sx={{ mt: 2 }}>
      {indicatorData.indicatorMajors.map((item, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <CustomCard>
            <Stack sx={{ pb: 3 }}>
              <Header text={item.major.majorName} />
            </Stack>
            <CustomTable header={tableHeader} isLoading={false}>
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
          </CustomCard>
        </Box>
      ))}
    </Box>
  );
};

export default JurusanSection;
