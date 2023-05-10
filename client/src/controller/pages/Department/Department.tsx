import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent, SyntheticEvent } from 'react';

import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';

import useDepartmentQuery from '@/repository/query/department/DepartmentQuery';
import DepartmentSelector from '@/presentation/page-component/Department/DepartmentSelector';
import useDepartmentByIdQuery from '@/repository/query/department/DepartmentById';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar';
import DepartmentTableHead from '@/presentation/page-component/Department/DepartmentTableHead';
import DepartmentTableBody from '@/presentation/page-component/Department/DepartmentTableBody';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { IndicatorDepartmentListNormalized } from '@/repository/query/department/DepartmentById';

const Department: FC = () => {
  const location = useLocation();

  const { currentYear } = useCurrentYear();

  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [enableExport, setEnableExport] = useState(false);
  const [selected, setSelected] = useState<IndicatorDepartmentListNormalized[]>(
    []
  );

  const { setHeadline } = useHeadline();
  const { data, isLoading } = useDepartmentQuery();
  const { data: listIndicator, isLoading: listIndicatorLoading } =
    useDepartmentByIdQuery(
      selectedDepartment,
      keyword,
      rows,
      page,
      Number(currentYear || 0)
    );

  const currentDepartment = useMemo(
    () => data.filter((item) => item.departmentID === selectedDepartment),
    [data]
  );

  const handleDepartmentChange = useCallback((e: SelectChangeEvent) => {
    setSelectedDepartment(Number(e.target.value));
  }, []);

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

    if (enableExport === true) {
      setSelected([]);
    }
  };

  const handleSelectAll = useCallback(
    (e: any) => {
      if (e.target.checked) {
        setSelected(listIndicator.indicatorList);
        return;
      }
      setSelected([]);
    },
    [data]
  );

  const handleSelect = useCallback(
    (
      e: SyntheticEvent<HTMLButtonElement>,
      item: IndicatorDepartmentListNormalized
    ) => {
      e.stopPropagation();

      const selectedIndex = selected
        .map((data) => data.indicatorID)
        .indexOf(item.indicatorID);

      let selectedArray: IndicatorDepartmentListNormalized[] = [];

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

  const isAllChecked = useMemo(() => {
    return (
      listIndicator.indicatorList.length > 0 &&
      selected.length === listIndicator.indicatorList.length
    );
  }, [listIndicator, selected]);

  useEffect(() => {
    if (location.pathname === '/dashboard/department') {
      setHeadline({
        title: 'Departemen',
        subTitle: 'Menampilkan progress perkembangan pada level Departemen',
        isYearPickerEnabled: true,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <Alert
        severity="info"
        variant="filled"
        sx={{ backgroundColor: PRIMARY.main, my: 2 }}
      >
        Keterangan: Data yang ada terdapat halaman ini merupakan data indikator
        fakultas yang dibagi pada level departemen. Untuk menambahkan atau
        mengurangi indikator yang dapat dibagi pada level ini, silahkan kunjungi
        halaman List Indikator
      </Alert>
      <DepartmentSelector
        imageURL={`${currentDepartment[0]?.departmentImage || ''}`}
        department={data}
        isLoading={isLoading}
        currentDepartment={selectedDepartment}
        onChange={handleDepartmentChange}
      />
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
            <DepartmentTableHead
              enableCheckbox={enableExport}
              handleSelectAll={handleSelectAll}
              isAllChecked={isAllChecked}
            />
          }
          bodyComponent={
            isLoading ? (
              <TableSkeleton />
            ) : (
              <Fragment>
                {listIndicator.indicatorList.map((item, index) => (
                  <DepartmentTableBody
                    key={item.indicatorID}
                    index={index}
                    enableCheckbox={enableExport}
                    onCheckboxClick={handleSelect}
                    selected={selected}
                    imageURL={`${currentDepartment[0]?.departmentImage || ''}`}
                    currentYear={Number(currentYear || 0)}
                    {...item}
                  />
                ))}
              </Fragment>
            )
          }
          paginationComponent={
            <TablePagination
              currentPage={page}
              currentSize={rows}
              totalData={listIndicator.totalData}
              totalPage={listIndicator.totalPage}
              handleTableSize={handleTableSize}
              handleTablePagination={handleTablePagination}
            />
          }
        />
      </Fragment>
    </Fragment>
  );
};

export default Department;
