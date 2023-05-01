import { useQueryClient } from 'react-query';
import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';

import useIndicatorQuery from '@/repository/query/indicator/IndicatorQuery';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer';
import EditIndicatorTableHead from '@/presentation/page-component/EditIndicator/EditIndicatorTableHead';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton';
import EditIndicatorTableBody from '@/presentation/page-component/EditIndicator/EditIndicatorTableBody';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination';
import useUpdateIndicatorTypeMutation from '@/repository/mutation/UpdateIndicatorTypeMutation';
import { useHeadline } from '@/controller/context/HeadlineContext';
import type { IndicatorListNormalized } from '@/repository/query/indicator/IndicatorQuery';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup/LoadingPopup';

const EditIndicator: FC = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { setHeadline } = useHeadline();

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { data, isLoading } = useIndicatorQuery(rows, keyword, page);

  const { mutate } = useUpdateIndicatorTypeMutation();

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

  const handleDepartmentCheckbox = useCallback(
    (item: IndicatorListNormalized) => {
      let type = 1;

      if (item.indicatorType === 4) {
        type = 3;
      } else if (item.indicatorType === 3) {
        type = 4;
      } else if (item.indicatorType === 1) {
        type = 2;
      }

      const payload = {
        indicator_id: item.indicatorID,
        indicator_type: type,
      };

      setLoading(true);

      mutate(payload, {
        onSuccess: (res) => {
          if (res.status >= 400) {
            throw res.data.message;
          } else {
            setLoading(false);

            queryClient.invalidateQueries({
              queryKey: ['indicator-list'],
            });
          }
        },
        onError: () => {
          setLoading(false);
        },
      });
    },
    []
  );

  const handleMajorCheckbox = useCallback((item: IndicatorListNormalized) => {
    let type = 1;

    if (item.indicatorType === 4) {
      type = 2;
    } else if (item.indicatorType === 2) {
      type = 4;
    } else if (item.indicatorType === 1) {
      type = 3;
    }

    const payload = {
      indicator_id: item.indicatorID,
      indicator_type: type,
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);

          queryClient.invalidateQueries({
            queryKey: ['indicator-list'],
          });
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    if (location.pathname === '/dashboard/indicator-edit') {
      setHeadline({
        title: 'Edit Indikator',
        subTitle: 'Ubah informasi indikator',
        isYearPickerEnabled: false,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <TableToolbar
        handleCheckbox={() => {}}
        handleKeywordChange={handleKeywordChange}
      />
      <Alert variant="outlined" severity="info" sx={{ mb: 2 }}>
        Gunakan checkbox pada tabel dibawah untuk mengubah level pembagian data
        Indikator
      </Alert>
      <TableContainer
        enableCheckbox={false}
        headComponent={
          <EditIndicatorTableHead
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
              <EditIndicatorTableBody
                key={item.indicatorID}
                item={item}
                index={index}
                handleDepartmentCheckbox={handleDepartmentCheckbox}
                handleMajorCheckbox={handleMajorCheckbox}
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
      <LoadingPopup open={loading} />
    </Fragment>
  );
};

export default EditIndicator;
