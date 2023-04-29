import { useNavigate } from 'react-router-dom';
import { useState, Fragment } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material/Select';

import emptyIcon from '@/assets/logo/empty.png';
import Pill from '@/components/UI/atoms/Pill';
import SearchBar from '@/components/UI/atoms/SearchBar/SearchBar';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { IndicatorMajorsNormalized } from '@/repository/query/major/MajorByIdQuery/types';
import TableFilter from './TableFilter/TableFilter';

interface MajorCardProps {
  majorName: string;
  majorImage: string;
  currentYear: string;
  rows: number;
  count: number;
  page: number;
  totalPage: number;
  view: number;
  data: IndicatorMajorsNormalized[];
  setView: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>;
  handleTablePagination: (e: any, value: number) => void;
  handleTableSize: (event: SelectChangeEvent) => void;
}

const MajorCard: FC<MajorCardProps> = (props) => {
  const {
    majorName,
    majorImage,
    data,
    currentYear,
    view,
    totalPage,
    handleTablePagination,
    handleTableSize,
    rows,
    count,
    page,
    setKeyword,
    setView,
  } = props;

  const navigate = useNavigate();

  const filterView = data.reduce<IndicatorMajorsNormalized[]>((acc, cur) => {
    const { targetMajors, ...rest } = cur;

    const newData = targetMajors.filter((item) => {
      if (view === 1) {
        return item;
      } else if (view === 2) {
        return item.targetQuarter.isTargetFulfilled === true;
      } else if (view === 3) {
        return (
          item.targetQuarter.isTargetFulfilled === false &&
          item.targetQuarter.year.yearID !== 0
        );
      } else if (view === 4) {
        return item.targetQuarter.year.yearID === 0;
      }
    });

    if (newData.length !== 0) {
      acc.push({ ...rest, targetMajors: newData });
    }

    return acc;
  }, []);

  return (
    <Box>
      <Card>
        <Stack
          direction={{ sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box sx={{ width: '100%', maxWidth: '480px' }}>
            <SearchBar setKeyword={setKeyword} />
          </Box>
          <TableFilter setView={setView} view={view} />
        </Stack>
        <Table
          sx={{
            overflowX: 'auto',
            border: '1px solid rgba(224, 224, 224, 1);',
          }}
        >
          <TableHead
            sx={{
              color: 'white',
              backgroundColor: PRIMARY.main,
            }}
          >
            <TableRow>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'No.'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Kode Indikator'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Nama Indikator'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Q1'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Q2'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Q3'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Q4'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Target'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Header
                  variant="subtitle2"
                  text={'Status'}
                  sx={{ color: 'white' }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          {filterView.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={100}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py: 2 }}
                  >
                    <img src={emptyIcon} alt="" style={{ width: 100 }} />
                    <SubHeader text="Tabel Kosong" />
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            filterView.map((item, id) => (
              <TableBody key={item.indicatorMajorID}>
                <TableRow
                  key={id}
                  onClick={() =>
                    navigate(
                      `/dashboard/indicator/${item.indicator.indicatorID}`
                    )
                  }
                  sx={{
                    ':hover': {
                      backgroundColor: GREY[300],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>
                    <Header variant="body2" text={`${id + 1}`} />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="body2"
                      text={item.indicator.indicatorCode}
                    />
                  </TableCell>
                  <TableCell>
                    <Header
                      variant="body2"
                      text={item.indicator.indicatorName}
                    />
                  </TableCell>
                  {item.targetMajors
                    .filter(
                      (el) =>
                        String(el.targetQuarter.year.yearValue) === currentYear
                    )
                    .map((el, idx) => (
                      <Fragment key={idx}>
                        <TableCell>
                          <Header
                            variant="body2"
                            text={`${el.targetQuarter.q1}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Header
                            variant="body2"
                            text={`${el.targetQuarter.q2}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Header
                            variant="body2"
                            text={`${el.targetQuarter.q3}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Header
                            variant="body2"
                            text={`${el.targetQuarter.q4}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Header
                            variant="body2"
                            text={`${el.targetQuarter.targetValue}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Pill
                            isNotAdded={el.targetQuarter.year.yearID === 0}
                            isError={
                              el.targetQuarter.isTargetFulfilled === false
                            }
                          >
                            <Header
                              variant="subtitle2"
                              text={`${
                                el.targetQuarter.year.yearID === 0
                                  ? 'Belum ditambahkan'
                                  : el.targetQuarter.isTargetFulfilled === true
                                  ? 'Memenuhi'
                                  : 'Belum Memenuhi'
                              }`}
                            />
                          </Pill>
                        </TableCell>
                      </Fragment>
                    ))}
                </TableRow>
              </TableBody>
            ))
          )}
        </Table>
        <Stack
          direction={{ sm: 'row' }}
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Stack flexDirection="row" alignItems="center">
            <SubHeader text="Menampilkan" sx={{ mr: 1 }} />
            <FormControl>
              <Select
                value={`${rows}`}
                variant="standard"
                onChange={handleTableSize}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <SubHeader text={`data dari total ${count} data`} />
          </Stack>
          <Pagination
            count={totalPage}
            onChange={handleTablePagination}
            page={page + 1}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default MajorCard;
