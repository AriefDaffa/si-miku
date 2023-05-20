import { useNavigate } from 'react-router-dom';
import { useState, Fragment } from 'react';
import type { FC, ChangeEvent } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import type { UserDataOverviewNormalized } from '@/repository/query/user/UserQuery';

import UserTableHead from '@/presentation/page-component/User/UserTable/UserTableHead';
import UserTableBody from '@/presentation/page-component/User/UserTable/UserTableBody';
import TablePagination from '@/presentation/page-component/common/TableComponent/TablePagination';
import TableSkeleton from '@/presentation/page-component/common/TableComponent/TableSkeleton';
import TableContainer from '@/presentation/page-component/common/TableComponent/TableContainer';
import TableToolbar from '@/presentation/page-component/common/TableComponent/TableToolbar';

interface UserTableControllerProps {
  isLoading: boolean;
  currentPage: number;
  currentSize: number;
  data: UserDataOverviewNormalized;
  handleTablePagination: (e: any, value: number) => void;
  handleTableSize: (event: SelectChangeEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserTableController: FC<UserTableControllerProps> = (props) => {
  const {
    data,
    currentPage,
    currentSize,
    handleChange,
    handleTablePagination,
    handleTableSize,
    isLoading,
  } = props;

  const [selected, setSelected] = useState<number[]>([]);

  const [sort, setSort] = useState('asc');

  const navigate = useNavigate();

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.userList.map((item) => item.userID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  // @TODO ADD SEARCH EMPTY RESULT
  return (
    <Fragment>
      <TableToolbar
        handleCheckbox={() => {}}
        handleKeywordChange={handleChange}
      />
      <TableContainer
        enableCheckbox={false}
        headComponent={
          <UserTableHead
            enableCheckbox={false}
            handleSelectAll={handleSelectAllClick}
            isAllChecked={false}
          />
        }
        bodyComponent={
          isLoading ? (
            <TableSkeleton />
          ) : (
            data.userList.map((item, index) => (
              <UserTableBody key={item.userID} item={item} index={index} />
            ))
          )
        }
        paginationComponent={
          <TablePagination
            currentPage={currentPage}
            currentSize={currentSize}
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

export default UserTableController;
