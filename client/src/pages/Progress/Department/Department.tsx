import { useState, useEffect } from 'react';
import type { FC } from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import type { SelectChangeEvent } from '@mui/material/Select';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import DepartmentCard from './DepartmentCard';
import useDepartmentQuery from '@/repository/query/department/DepartmentQuery';
import useDepartmentByIdQuery from '@/repository/query/department/DepartmentById';
import LoadingCard from '@/components/UI/molecules/LoadingCard';
import OverviewCard from '@/components/UI/organism/OverviewCard/OverviewCard';
import AvatarTitle from '@/components/UI/organism/AvatarTitle/AvatarTitle';
import { PageTitle } from '@/components/UI/atoms/Typography';
import type { IndicatorDepartmentNormalized } from '@/repository/query/department/DepartmentById';

import DepartmentFilter from './DepartmentFilter';

const Department: FC = () => {
  const [selectedYear, setSelectedYear] = useState('2017');
  const [currentDepartment, setCurrentDepartment] = useState(1);
  const [view, setView] = useState(1);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(25);
  const [keyword, setKeyword] = useState('');

  // const { data: year } = useYearQuery();
  const { data: departmentList, isLoading: isDepartmentListLoading } =
    useDepartmentQuery();
  const { data: department, isLoading: isDepartmentLoading } =
    useDepartmentByIdQuery(currentDepartment, keyword, rows, page);

  const filteredData = department.indicatorDepartment.reduce<{
    data: IndicatorDepartmentNormalized[];
    failed: number;
    fulfilled: number;
    notSet: number;
  }>(
    (acc, cur) => {
      const { targetDeps, ...rest } = cur;

      const newTargetDeps = targetDeps.filter((item) => {
        return String(item.targetQuarter.year.yearValue) === selectedYear;
      });

      newTargetDeps.map((item) => {
        if (item.targetQuarter.isTargetFulfilled === true) {
          acc.fulfilled += 1;
        } else if (item.targetQuarter.isTargetFulfilled === false) {
          acc.failed += 1;
        }
      });

      if (newTargetDeps.length !== 0) {
        acc.data.push({ ...rest, targetDeps: newTargetDeps });
      } else {
        acc.notSet += 1;
        acc.data.push({
          ...rest,
          targetDeps: [
            {
              targetQuarter: {
                q1: 0,
                q2: 0,
                q3: 0,
                q4: 0,
                isTargetFulfilled: false,
                targetValue: 0,
                year: { yearID: 0, yearValue: Number(selectedYear) },
                targetQuarterID: 0,
              },
            },
          ],
        });
      }

      return acc;
    },
    { data: [], fulfilled: 0, failed: 0, notSet: 0 }
  );

  const handleTablePagination = (e: any, value: number) => {
    setPage(value - 1);
  };

  const handleTableSize = (event: SelectChangeEvent) => {
    setPage(0);
    setRows(Number(event.target.value || 0));
  };

  return (
    <>
      <Helmet title="List Departemen | SI-MIKU" />
      <PageTitle
        title="Departemen"
        subTitle="Menampilkan seluruh data departemen yang terdapat pada sistem"
      />
      <Grid
        spacing={2}
        // sm={[12, 4, 4, 4]}
        gridItem={[
          // <DepartmentGraphic />,
          <DepartmentFilter
            view={view}
            setView={setView}
            currentDepartment={currentDepartment}
            department={departmentList}
            selectedYear={selectedYear}
            setCurrentDepartment={setCurrentDepartment}
            setSelectedYear={setSelectedYear}
          />,
          <AvatarTitle
            imageURL={department.departmentImage}
            subHeader="Data Departemen"
            header={`${department.departmentName}`}
          />,
          <OverviewCard
            isDepartment
            failed={filteredData.failed}
            fulfilled={filteredData.fulfilled}
            notSet={filteredData.notSet}
            selectedYear={selectedYear}
            totalData={department.totalData}
          />,
          isDepartmentListLoading || isDepartmentLoading ? (
            <LoadingCard />
          ) : filteredData.data.length > 0 ? (
            <DepartmentCard
              setKeyword={setKeyword}
              view={view}
              setView={setView}
              rows={rows}
              data={filteredData.data}
              currentYear={selectedYear}
              totalPage={department.totalPage}
              page={department.currentPage}
              count={department.totalData}
              departmentName={department.departmentName}
              departmentImage={department.departmentImage}
              handleTablePagination={handleTablePagination}
              handleTableSize={handleTableSize}
            />
          ) : null,
        ]}
      />
    </>
  );
};

export default Department;
