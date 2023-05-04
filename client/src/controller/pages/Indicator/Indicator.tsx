import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import Alert from '@mui/material/Alert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { SelectChangeEvent } from '@mui/material/Select';

import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle/AvatarTitle';
import OverviewCard from '@/presentation/page-component/Home/OverviewCard/OverviewCard';
import useIndicatorOverview from '@/repository/query/indicator/IndicatorOverview';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import IndicatorChart from '@/presentation/page-component/Home/IndicatorChart/IndicatorChart';
import moment from 'moment';

import IndicatorTable from './IndicatorTable';

const Indicator: FC = () => {
  const location = useLocation();

  const { setHeadline } = useHeadline();

  const [yearRange, setYearRange] = useState('2023,2022,2021,2020,2019');
  const [yearRangePicker, setYearRangePicker] = useState(5);

  const { data } = useIndicatorOverview(yearRange);

  // const handleChangeYearRange = useCallback((e: SelectChangeEvent) => {
  //   let currentYear = moment().year();
  //   const finalArr = [];

  //   const yearRange = Number(e.target.value || 0);

  //   if (yearRange !== 0) {
  //     for (let i = 0; i < yearRange; i++) {
  //       if (i === 0) {
  //         finalArr.push(currentYear);
  //       } else {
  //         finalArr.push((currentYear -= 1));
  //       }
  //     }
  //   }

  //   setYearRange(finalArr.join(','));
  //   setYearRangePicker(yearRange);
  // }, []);

  useEffect(() => {
    if (location.pathname === '/dashboard/indicator') {
      setHeadline({
        title: 'List Indikator',
        subTitle: 'Menampilkan progress perkembangan Indikator',
        isYearPickerEnabled: false,
      });
    }
  }, [location]);

  return (
    <Fragment>
      {location.pathname === '/dashboard/indicator' ? (
        <Fragment>
          <OverviewCard
            totalDepartment={data.indicatorDepartment}
            totalIndicator={data.indicatorTotal}
            totalMajor={data.indicatorMajor}
          />
          <Alert
            severity="info"
            variant="filled"
            sx={{ backgroundColor: PRIMARY.main, my: 2 }}
          >
            Beberapa data indikator dapat dibagi pada level Departemen, dan
            Program Studi. Untuk mengubah pembagian indikator pada sistem,
            silahkan gunakan checkbox yang ada pada tabel dibawah.
          </Alert>
          <IndicatorTable />
        </Fragment>
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default Indicator;
