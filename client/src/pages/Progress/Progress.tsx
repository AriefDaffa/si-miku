import moment from 'moment';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import type { FC, ChangeEvent } from 'react';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import type { SelectChangeEvent } from '@mui/material/Select';

import Flexer from '@/components/UI/atoms/Flexer/Flexer';
import YearPicker from '@/components/UI/atoms/YearPicker';
import PageContainer from '@/components/UI/molecules/PageContainer';
import TargetQuarterTable from '@/components/UI/organism/TargetQuarterTable';
import useGetIndicatorFacultyDataQuery from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import { PageTitle } from '@/components/UI/atoms/Typography';

import Overview from './components/Overview';
import AvatarTitle from '@/components/UI/organism/AvatarTitle/AvatarTitle';

const Progress: FC = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [year, setYear] = useState('2017');

  const { data, isLoading } = useGetIndicatorFacultyDataQuery(
    rows,
    keyword,
    page,
    year
  );

  const normalizedProps = useMemo(() => {
    const { indicatorList, ...rest } = data;
    return {
      ...rest,
      dataArray: indicatorList.map((item) => {
        const { indicatorFaculties, ...rest } = item;
        return {
          ...rest,
          dataQuarter: indicatorFaculties,
        };
      }),
    };
  }, [data]);

  const handleTablePagination = useCallback((e: any, value: number) => {
    setPage(value - 1);
  }, []);

  const handleTableSize = useCallback((event: SelectChangeEvent) => {
    setRows(Number(event.target.value || 0));
  }, []);

  const handleKeywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      setPage(0);
    },
    []
  );

  const handleSelectYear = useCallback((year: string | null) => {
    if (year !== null) {
      setYear(String(moment(year).year()));
    }
  }, []);

  return (
    <PageContainer title="Progress Indikator">
      {location.pathname === '/dashboard/progress' ? (
        <>
          <Flexer>
            <PageTitle
              title="Progress Indikator"
              subTitle="Menampilkan progress perkembangan seluruh data indikator yang terdapat pada sistem"
            />
            <YearPicker
              label=""
              yearValue={year}
              handleSelectYear={handleSelectYear}
            />
          </Flexer>
          <Overview />
          <AvatarTitle
            isImageIcon
            Icon={SignalCellularAltIcon}
            header="List Indikator"
            subHeader="Tabel"
            imageURL=""
          />
          <TargetQuarterTable
            {...normalizedProps}
            isLoading={isLoading}
            currentSize={rows}
            handleTablePagination={handleTablePagination}
            handleTableSize={handleTableSize}
            handleKeywordChange={handleKeywordChange}
          />
        </>
      ) : (
        <Outlet />
      )}
    </PageContainer>
  );
};

export default Progress;
