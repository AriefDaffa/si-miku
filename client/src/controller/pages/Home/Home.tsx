import { useState, useCallback, useEffect, Fragment, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

import IndicatorChart from '@/presentation/page-component/Home/IndicatorChart';
import useIndicatorOverview from '@/repository/query/indicator/IndicatorOverview';
import IndicatorGraph from '@/presentation/page-component/Home/IndicatorGraph/IndicatorGraph';
import useIndicatorOverviewByYear from '@/repository/query/indicator/IndicatorOverviewByYear';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useGetLastFewYear } from './usecase/use-get-last-few-year';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';

const Home: FC = () => {
  const location = useLocation();

  const { setHeadline } = useHeadline();
  const { currentYear, handleSelectYear } = useCurrentYear();

  const [sort, setSort] = useState(true);
  const [yearRangePicker, setYearRangePicker] = useState(5);

  const yearRange = useMemo(
    () => useGetLastFewYear(yearRangePicker, sort),
    [yearRangePicker, sort]
  );

  const { data, isFetching: isIndicatorFetching } =
    useIndicatorOverview(yearRange);
  const { data: year } = useIndicatorOverviewByYear(currentYear);

  const handleChangeYearRange = useCallback((e: SelectChangeEvent) => {
    setYearRangePicker(Number(e.target.value || 5));
  }, []);

  const handleSort = useCallback((e: SelectChangeEvent) => {
    setSort(e.target.value === 'true');
  }, []);

  useEffect(() => {
    if (location.pathname === '/dashboard/home') {
      setHeadline({
        title: 'Home',
        subTitle:
          'Menampilkan progress seluruh indikator yang terdapat pada sistem',
        isYearPickerEnabled: false,
      });
    }
  }, [location]);

  return (
    <Fragment>
      {/* <OverviewCard
        totalDepartment={data.indicatorDepartment}
        totalIndicator={data.indicatorTotal}
        totalMajor={data.indicatorMajor}
      /> */}
      <IndicatorChart
        sort={sort}
        yearRange={yearRangePicker}
        indicatorTotal={data.indicatorTotal}
        data={data.yearProgress}
        onYearRangeChange={handleChangeYearRange}
        onSortChange={handleSort}
        isLoading={isIndicatorFetching}
      />
      <IndicatorGraph
        indicatorTotal={data.indicatorTotal}
        indicatorFulfilled={year.count.fulfilled}
        indicatorFailed={year.count.failed}
        currentYear={currentYear}
        handleSelectYear={handleSelectYear}
      />
    </Fragment>
  );
};

export default Home;
