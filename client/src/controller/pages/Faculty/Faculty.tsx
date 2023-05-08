import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent, SyntheticEvent } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import useGetIndicatorFacultyDataQuery from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import OverviewCard from '@/presentation/page-component/Home/OverviewCard';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer';
import FacultyTableHead from '@/presentation/page-component/Faculty/FacultyTableHead';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton';
import FacultyTableBody from '@/presentation/page-component/Faculty/FacultyTableBody';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { useHeadline } from '@/controller/context/HeadlineContext';
import type { FakultasIndikatorNormalized } from '@/repository/query/faculty/GetIndicatorFacultyDataQuery';
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

const Faculty: FC = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [enableExport, setEnableExport] = useState(false);
  const [selected, setSelected] = useState<FakultasIndikatorNormalized[]>([]);

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

  const handleEnableCheckbox = () => {
    setEnableExport(!enableExport);
  };

  const handleSelect = useCallback(
    (
      e: SyntheticEvent<HTMLButtonElement>,
      item: FakultasIndikatorNormalized
    ) => {
      e.stopPropagation();

      const selectedIndex = selected
        .map((data) => data.indicatorID)
        .indexOf(item.indicatorID);

      let selectedArray: FakultasIndikatorNormalized[] = [];

      if (selectedIndex === -1) {
        selectedArray = selectedArray.concat(selected, item);
      } else if (selectedIndex === 0) {
        selectedArray = selectedArray.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        selectedArray = selectedArray.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        selectedArray = selectedArray.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(selectedArray);
    },
    [selected]
  );

  const handleSelectAll = useCallback(
    (e: any) => {
      if (e.target.checked) {
        setSelected(data.indicatorList);
        return;
      }
      setSelected([]);
    },
    [data]
  );

  const isAllChecked = useMemo(() => {
    return (
      data.indicatorList.length > 0 &&
      selected.length === data.indicatorList.length
    );
  }, [data, selected]);

  const handleExport = useCallback(() => {}, []);

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
        withExportButton
        handleCheckbox={handleEnableCheckbox}
        handleKeywordChange={handleKeywordChange}
      />
      <TableContainer
        enableCheckbox={enableExport}
        selectedData={selected.length}
        headComponent={
          <FacultyTableHead
            enableCheckbox={enableExport}
            handleSelectAll={handleSelectAll}
            isAllChecked={isAllChecked}
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
                enableCheckbox={enableExport}
                onCheckboxClick={handleSelect}
                selected={selected}
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
