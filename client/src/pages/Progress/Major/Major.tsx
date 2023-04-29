import { useState, useEffect } from 'react';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import type { SelectChangeEvent } from '@mui/material/Select';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import useMajorQuery from '@/repository/query/major/MajorQuery';
import useMajorByIdQuery from '@/repository/query/major/MajorByIdQuery/useMajorByIdQuery';
import useYearQuery from '@/repository/query/year/YearQuery/useYearQuery';
import LoadingCard from '@/components/UI/molecules/LoadingCard';
import EmptyResultCard from '@/components/UI/molecules/EmptyResultCard';
import TextWithSubHeader from '@/components/UI/molecules/TextWithSubHeader';
import OverviewCard from '@/components/UI/organism/OverviewCard/OverviewCard';
import { PageTitle } from '@/components/UI/atoms/Typography';
import type { IndicatorMajorsNormalized } from '@/repository/query/major/MajorByIdQuery/types';

import MajorCard from './MajorCard';
import MajorFilter from './MajorFilter';
import AvatarTitle from '@/components/UI/organism/AvatarTitle/AvatarTitle';

const Major: FC = () => {
  const [selectedYear, setSelectedYear] = useState('2017');
  const [currentMajor, setCurrentMajor] = useState(1);
  const [view, setView] = useState(1);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(25);
  const [keyword, setKeyword] = useState('');

  // const { data: year } = useYearQuery();
  const { data: majorList, isLoading: isMajorListLoading } = useMajorQuery();
  const { data: major, isLoading: isMajorLoading } = useMajorByIdQuery(
    currentMajor,
    keyword,
    rows,
    page
  );

  const filteredDataByYear = major.indicatorMajors.reduce<{
    data: IndicatorMajorsNormalized[];
    failed: number;
    fulfilled: number;
    notSet: number;
  }>(
    (acc, cur) => {
      const { targetMajors, ...rest } = cur;

      const newTargetDeps = targetMajors.filter(
        (item) => String(item.targetQuarter.year.yearValue) === selectedYear
      );

      newTargetDeps.map((item) => {
        if (item.targetQuarter.isTargetFulfilled === true) {
          acc.fulfilled += 1;
        } else if (item.targetQuarter.isTargetFulfilled === false) {
          acc.failed += 1;
        }
      });

      if (newTargetDeps.length !== 0) {
        acc.data.push({ ...rest, targetMajors: newTargetDeps });
      } else {
        acc.notSet += 1;
        acc.data.push({
          ...rest,
          targetMajors: [
            {
              targetMajorID: 0,
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
    { data: [], failed: 0, fulfilled: 0, notSet: 0 }
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
      <Helmet title="Program Studi | SI-MIKU" />
      <PageTitle
        title="Program Studi"
        subTitle="Menampilkan seluruh data Program Studi yang terdapat pada sistem"
      />
      <Grid
        spacing={2}
        gridItem={[
          <MajorFilter
            view={view}
            setView={setView}
            currentMajor={currentMajor}
            major={majorList}
            selectedYear={selectedYear}
            setCurrentMajor={setCurrentMajor}
            setSelectedYear={setSelectedYear}
          />,
          <AvatarTitle
            imageURL={major.majorImage}
            subHeader="Data Program Studi"
            header={major.majorName}
          />,
          <OverviewCard
            failed={filteredDataByYear.failed}
            fulfilled={filteredDataByYear.fulfilled}
            isDepartment={false}
            notSet={filteredDataByYear.notSet}
            selectedYear={selectedYear}
            totalData={major.totalData}
          />,
          isMajorListLoading || isMajorLoading ? (
            <LoadingCard />
          ) : filteredDataByYear.data.length > 0 ? (
            <MajorCard
              setKeyword={setKeyword}
              view={view}
              setView={setView}
              rows={rows}
              data={filteredDataByYear.data}
              currentYear={selectedYear}
              totalPage={major.totalPage}
              page={major.currentPage}
              count={major.totalData}
              majorName={major.majorName}
              majorImage={major.majorImage}
              handleTablePagination={handleTablePagination}
              handleTableSize={handleTableSize}
            />
          ) : null, // tambah skeleton loader
        ]}
      />
    </>
  );
};

export default Major;
