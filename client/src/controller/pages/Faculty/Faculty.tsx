import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import OverviewSection from '@/presentation/page-component/Indicator/OverviewSection';
import TargetQuarterTable from '@/presentation/page-component/common/TargetQuarterTable';
import useGetIndicatorFacultyDataQuery from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { useHeadline } from '@/controller/context/HeadlineContext';
import OverviewCard from '@/presentation/page-component/Home/OverviewCard/OverviewCard';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar/TableToolbar';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer/TableContainer';
import FacultyTableHead from '@/presentation/page-component/Faculty/FacultyTableHead/FacultyTablehead';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton/TableSkeleton';
import FacultyTableBody from '@/presentation/page-component/Faculty/FacultyTableBody/FacultyTableBody';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination/TablePagination';

const Faculty: FC = () => {
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
    if (location.pathname === '/dashboard/faculty') {
      setHeadline({
        title: 'List Data Fakultas',
        subTitle:
          'Menampilkan progress perkembangan seluruh data indikator pada level fakultas',
        isYearPickerEnabled: true,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <TableToolbar
        handleCheckbox={() => {}}
        handleKeywordChange={handleKeywordChange}
      />
      <TableContainer
        enableCheckbox={false}
        headComponent={
          <FacultyTableHead
            enableCheckbox={false}
            handleSelectAll={() => {}}
            isAllChecked={false}
          />
        }
        bodyComponent={
          isLoading ? (
            <TableSkeleton />
          ) : (
            data.indicatorList.map((item, index) => (
              <FacultyTableBody
                key={item.indicatorID}
                index={index}
                enableCheckbox={false}
                {...item}
              />
            ))
          )
        }
        paginationComponent={
          <TablePagination
            currentPage={page}
            currentSize={rows}
            totalData={data.totalData}
            totalPage={data.totalPage}
            handleTableSize={handleTableSize}
            handleTablePagination={handleTablePagination}
          />
        }
      />
    </Fragment>
  );
};

export default Faculty;
