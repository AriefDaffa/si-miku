import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import OverviewSection from '@/presentation/page-component/Indicator/OverviewSection';
import TargetQuarterTable from '@/presentation/page-component/Indicator/TargetQuarterTable';
import useGetIndicatorFacultyDataQuery from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { useHeadline } from '@/controller/context/HeadlineContext';

const Indicator: FC = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { currentYear } = useCurrentYear();
  const { setHeadline } = useHeadline();

  const { data, isLoading } = useGetIndicatorFacultyDataQuery(
    rows,
    keyword,
    page,
    currentYear
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

  useEffect(() => {
    if (location.pathname === '/dashboard/indicator') {
      setHeadline({
        title: 'List Indikator',
        subTitle:
          'Menampilkan progress perkembangan seluruh data indikator yang terdapat pada sistem',
        isYearPickerEnabled: true,
      });
    }
  }, [location]);

  return (
    <Fragment>
      {location.pathname === '/dashboard/indicator' ? (
        <Fragment>
          <OverviewSection />
          <TargetQuarterTable
            {...normalizedProps}
            isLoading={isLoading}
            currentSize={rows}
            handleTablePagination={handleTablePagination}
            handleTableSize={handleTableSize}
            handleKeywordChange={handleKeywordChange}
          />
        </Fragment>
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default Indicator;
