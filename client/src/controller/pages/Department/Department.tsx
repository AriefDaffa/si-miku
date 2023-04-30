import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';

import useDepartmentQuery from '@/repository/query/department/DepartmentQuery';
import DepartmentSelector from '@/presentation/page-component/Department/DepartmentSelector/DepartmentSelector';
import useDepartmentByIdQuery from '@/repository/query/department/DepartmentById/useDepartmentByIdQuery';
import TargetQuarterTable from '@/presentation/page-component/common/TargetQuarterTable/TargetQuarterTable';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

const Department: FC = () => {
  const location = useLocation();

  const { currentYear } = useCurrentYear();

  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

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

  const normalizedValue = useMemo(() => {
    const { indicatorList, ...rest } = listIndicator;
    return {
      ...rest,
      dataArray: indicatorList.map((item) => {
        const { targetQuarter, indicatorDataType, ...rest } = item;
        return {
          ...rest,
          dataQuarter: targetQuarter,
        };
      }),
    };
  }, [listIndicator]);

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
        halaman ini
      </Alert>
      <DepartmentSelector
        imageURL={`${currentDepartment[0]?.departmentImage || ''}`}
        department={data}
        isLoading={isLoading}
        currentDepartment={selectedDepartment}
        onChange={handleDepartmentChange}
      />
      <TargetQuarterTable
        {...normalizedValue}
        isLoading={listIndicatorLoading}
        currentSize={rows}
        handleTablePagination={handleTablePagination}
        handleTableSize={handleTableSize}
        handleKeywordChange={handleKeywordChange}
      />
    </Fragment>
  );
};

export default Department;
