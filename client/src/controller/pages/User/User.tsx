import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState, useCallback } from 'react';
import type { FC, ChangeEvent } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import useUserQuery from '@/repository/query/user/UserQuery';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useAuthContext } from '@/controller/context/AuthContext';

import AddUserController from './AddUserController';
import UserTableController from './UserTableController/UserTableController';

const User: FC = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { setHeadline } = useHeadline();
  const { roleID, isLoading } = useAuthContext();

  const navigate = useNavigate();

  const { data: operatorData, isLoading: isOperatorLoading } = useUserQuery(
    2,
    rows,
    keyword,
    page
  );

  const handleTablePagination = useCallback((e: any, value: number) => {
    setPage(value - 1);
  }, []);

  const handleTableSize = useCallback((event: SelectChangeEvent) => {
    setPage(0);
    setRows(Number(event.target.value || 0));
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  useEffect(() => {
    if (roleID !== 3 && !isLoading) {
      navigate('/not-found');
    }

    if (location.pathname === '/dashboard/user') {
      setHeadline({
        title: 'Management User',
        subTitle: 'Menampilkan Operator yang ada pada sistem',
        isYearPickerEnabled: false,
      });
    }
  }, [location, roleID, isLoading]);

  return (
    <Fragment>
      <AddUserController />
      <UserTableController
        currentPage={page}
        currentSize={rows}
        data={operatorData}
        handleChange={handleChange}
        handleTablePagination={handleTablePagination}
        handleTableSize={handleTableSize}
        isLoading={isOperatorLoading}
      />
    </Fragment>
  );
};

export default User;
