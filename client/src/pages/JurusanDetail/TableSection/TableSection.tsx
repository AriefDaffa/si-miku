import { useEffect, useState, useMemo, Fragment } from 'react';
import type { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';

import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import CustomTable from '@/components/CustomTable';
import Pill from '@/components/Pill';
import { Header, SubHeader } from '@/components/Typography';
import { GREY } from '@/theme/Colors';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery/types';
import type { YearDataNormalized } from '@/repository/query/YearQuery/types';

import { tableHeader } from './constant';

interface TableSectionProps {
  isLoading: boolean;
  isYearLoading: boolean;
  yearData: YearDataNormalized[];
  majorData: IndicatorByMajorNormalized;
}

const TableSection: FC<TableSectionProps> = (props) => {
  const { majorData, yearData, isYearLoading, isLoading } = props;
  const [latestYear, setlatestYear] = useState('');

  const changeYear = (event: SelectChangeEvent) => {
    setlatestYear(event.target.value);
  };

  useEffect(() => {
    if (!isYearLoading) {
      setlatestYear(`${yearData[yearData.length - 1].yearValue}`);
    }
  }, [isYearLoading]);

  return (
    <CustomGrid
      sx={{ pt: 2 }}
      gridItem={[
        <CustomCard sx={{ overflowX: 'auto' }}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pb: 3 }}
          >
            <Box>
              <Header text="List Indikator" variant="h6" />
              <SubHeader
                text={`jurusan ${majorData.majorName} pada tahun ${latestYear}`}
              />
            </Box>
            {!isYearLoading ? (
              <FormControl>
                <Select
                  value={`${latestYear}`}
                  defaultValue={`${latestYear}`}
                  onChange={changeYear}
                >
                  {yearData.map((item, idx) => (
                    <MenuItem key={idx} value={item.yearValue}>
                      {item.yearValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Skeleton width={80} />
            )}
          </Stack>
          <CustomTable
            header={tableHeader}
            isLoading={isYearLoading}
            arrayLength={majorData.indicatorMajors.length}
          >
            {majorData.indicatorMajors
              .filter((item) =>
                item.yearData.some(
                  (data) => data.yearValue === Number(latestYear)
                )
              )
              .map((data, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    ':hover': { backgroundColor: GREY[300], cursor: 'pointer' },
                  }}
                >
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${idx + 1}`}
                      sx={{ py: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.indicatorCode}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="subtitle2"
                      text={`${data.indicatorName}`}
                    />
                  </TableCell>
                  {data.yearData
                    .filter((item) => item.yearValue === Number(latestYear))
                    .map((item, idx) => (
                      <Fragment key={idx}>
                        <TableCell>
                          <Header variant="subtitle2" text={`${item.q1}`} />
                        </TableCell>
                        <TableCell>
                          <Header variant="subtitle2" text={`${item.q2}`} />
                        </TableCell>
                        <TableCell>
                          <Header variant="subtitle2" text={`${item.q3}`} />
                        </TableCell>
                        <TableCell>
                          <Header variant="subtitle2" text={`${item.q4}`} />
                        </TableCell>
                        <TableCell>
                          <Header variant="subtitle2" text={`${item.target}`} />
                        </TableCell>
                        <TableCell>
                          <Pill isError={item.isTargetFulfilled === false}>
                            <Header
                              variant="subtitle2"
                              text={`${
                                item.isTargetFulfilled === true
                                  ? 'Memenuhi'
                                  : 'Belum Memenuhi'
                              }`}
                            />
                          </Pill>
                        </TableCell>
                      </Fragment>
                    ))}
                </TableRow>
              ))}
          </CustomTable>
        </CustomCard>,
      ]}
    />
  );
};

export default TableSection;
