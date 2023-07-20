import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent, SyntheticEvent } from 'react';

import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';

import useMajorQuery from '@/repository/query/major/MajorQuery/useMajorQuery';
import useMajorByIdQuery from '@/repository/query/major/MajorByIdQuery/useMajorByIdQuery';
import MajorSelector from '@/presentation/page-component/Major/MajorSelector/MajorSelector';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer';
import MajorTableHead from '@/presentation/page-component/Major/MajorTableHead';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton';
import MajorTableBody from '@/presentation/page-component/Major/MajorTableBody';
import IndicatorTableEmpty from '@/presentation/page-component/common/TableComponent/IndicatorTableEmpty';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { MajorListNormalized } from '@/repository/query/major/MajorByIdQuery';
import { convertToString } from '@/controller/utils/convert-to-string';
import { exportToExcel } from '@/controller/utils/export-to-excel';

const Major: FC = () => {
  const location = useLocation();

  const { currentYear } = useCurrentYear();

  const [selectedMajor, setselectedMajor] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [enableExport, setEnableExport] = useState(false);
  const [selected, setSelected] = useState<MajorListNormalized[]>([]);

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

  const currentMajor = useMemo(
    () => data.filter((item) => item.majorID === selectedMajor),
    [data]
  );

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
    (e: SyntheticEvent<HTMLButtonElement>, item: MajorListNormalized) => {
      e.stopPropagation();

      const selectedIndex = selected
        .map((data) => data.indicatorID)
        .indexOf(item.indicatorID);

      let selectedArray: MajorListNormalized[] = [];

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

  const handleExport = useCallback(() => {
    const normalizedData: object[] = [];

    selected.map((item, idx) => {
      let status = '';

      if (item.targetQuarter.yearID === 0) {
        status = 'Belum Ditambahkan';
      } else {
        if (item.targetQuarter.isTargetFulfilled === true) {
          status = 'Memenuhi';
        } else {
          status = 'Belum memenuhi';
        }
      }

      normalizedData.push({
        'No.': convertToString(idx + 1),
        'Kode Indikator': convertToString(item.indicatorCode),
        'Nama Indikator': convertToString(item.indicatorName),
        'Data Kuartil 1': convertToString(item.targetQuarter.q1),
        'Data Kuartil 2': convertToString(item.targetQuarter.q2),
        'Data Kuartil 3': convertToString(item.targetQuarter.q3),
        'Data Kuartil 4': convertToString(item.targetQuarter.q4),
        'Target Indikator': convertToString(item.targetQuarter.targetValue),
        'Status Indikator': status,
      });
    });

    exportToExcel(
      normalizedData,
      `Data Program Studi ${currentMajor[0]?.majorName} Tahun ${currentYear}`
    );
  }, [selected, currentYear]);

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
      {/* <Alert
        severity="info"
        variant="filled"
        sx={{ backgroundColor: PRIMARY.main, my: 2 }}
      >
        Keterangan: Data yang ada terdapat halaman ini merupakan data indikator
        fakultas yang dibagi pada level Program Studi. Untuk menambahkan atau
        mengurangi indikator yang dapat dibagi pada level ini, silahkan kunjungi
        halaman ini
      </Alert> */}
      <MajorSelector
        imageURL={`${currentMajor[0]?.majorImage || ''}`}
        major={data}
        isLoading={isLoading}
        currentDepartment={selectedMajor}
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
          onExport={handleExport}
          headComponent={
            <MajorTableHead
              enableCheckbox={enableExport}
              handleSelectAll={handleSelectAll}
              isAllChecked={isAllChecked}
            />
          }
          bodyComponent={
            isLoading ? (
              <TableSkeleton />
            ) : listIndicator.indicatorList.length ? (
              listIndicator.indicatorList.map((item, index) => (
                <MajorTableBody
                  key={item.indicatorID}
                  index={index}
                  enableCheckbox={enableExport}
                  onCheckboxClick={handleSelect}
                  selected={selected}
                  imageURL={`${currentMajor[0]?.majorImage || ''}`}
                  currentYear={Number(currentYear || 0)}
                  {...item}
                />
              ))
            ) : (
              <IndicatorTableEmpty
                message={
                  keyword.length > 0
                    ? 'Indikator tidak ditemukan'
                    : 'Indikator Kosong'
                }
              />
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

export default Major;
