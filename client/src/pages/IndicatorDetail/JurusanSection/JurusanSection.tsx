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
import { Header, SubHeader } from '@/components/Typography';
import type {
  IndicatorByIdNormalized,
  MajorsNormalized,
} from '@/repository/query/IndicatorByIdQuery/types';

import FormDialog from './FormDialog';
import { tableHeader } from './constant';

interface JurusanSectionProps {
  isIndicatorLoading: boolean;
  indicatorData: IndicatorByIdNormalized;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;
  const [openDialog, setOpenDialog] = useState<{
    state: boolean;
    major: MajorsNormalized;
  }>({ state: false, major: { majorId: 0, majorName: '' } });

  const handleOpenDialog = (major: MajorsNormalized) => {
    setOpenDialog({ state: true, major });
  };

  const handleCloseDialog = () => {
    setOpenDialog({ state: false, major: { majorId: 0, majorName: '' } });
  };

  return (
    <CustomCard>
      <Box>
        <Header text="Data indikator pada jurusan" />
        <SubHeader text="Menampilkan data indikator pada seluruh jurusan" />
      </Box>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
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
                  {item.indicatorData
                    .sort((a, b) => a.year.yearValue - b.year.yearValue)
                    .map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          ':hover': {
                            backgroundColor: GREY[300],
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <TableCell padding="checkbox">
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
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDialog(item.major)}
                  >
                    Input Data
                  </Button>
                </Box>
              </CustomCard>
            </Box>
          ))}
          <FormDialog
            open={openDialog.state}
            major={openDialog.major}
            handleClose={handleCloseDialog}
          />
        </Box>
      </Box>
    </CustomCard>
  );
};

export default JurusanSection;
