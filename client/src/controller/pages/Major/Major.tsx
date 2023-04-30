import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';

import TargetQuarterTable from '@/presentation/page-component/common/TargetQuarterTable/TargetQuarterTable';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import useMajorQuery from '@/repository/query/major/MajorQuery/useMajorQuery';
import useMajorByIdQuery from '@/repository/query/major/MajorByIdQuery/useMajorByIdQuery';
import MajorSelector from '@/presentation/page-component/Major/MajorSelector/MajorSelector';

const Major: FC = () => {
  const location = useLocation();

  const { currentYear } = useCurrentYear();

  const [selectedMajor, setselectedMajor] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { setHeadline } = useHeadline();
  const { data, isLoading } = useMajorQuery();
  const { data: listIndicator, isLoading: listIndicatorLoading } =
    useMajorByIdQuery(
      selectedMajor,
      keyword,
      rows,
      page,
      Number(currentYear || 0)
    );

  const currentDepartment = useMemo(
    () => data.filter((item) => item.majorID === selectedMajor),
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
    setselectedMajor(Number(e.target.value));
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
    if (location.pathname === '/dashboard/major') {
      setHeadline({
        title: 'Program Studi',
        subTitle: 'Menampilkan progress perkembangan pada level Program Studi',
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
        fakultas yang dibagi pada level Program Studi. Untuk menambahkan atau
        mengurangi indikator yang dapat dibagi pada level ini, silahkan kunjungi
        halaman ini
      </Alert>
      <MajorSelector
        imageURL={`${currentDepartment[0]?.majorImage || ''}`}
        major={data}
        isLoading={isLoading}
        currentDepartment={selectedMajor}
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

export default Major;
