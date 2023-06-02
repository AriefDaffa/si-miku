import { useLocation, Navigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import type { FC } from 'react';

import IndicatorInputSkeleton from '@/presentation/page-component/IndicatorInput/IndicatorInputSkeleton';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useAuthContext } from '@/controller/context/AuthContext';

import BulkInputController from './BulkInputController';
import FormInputController from './FormInputController';

const IndicatorInput: FC = () => {
  const location = useLocation();

  const { setHeadline } = useHeadline();
  const { roleID, isLoading } = useAuthContext();

  useEffect(() => {
    if (location.pathname === '/dashboard/indicator-input') {
      setHeadline({
        title: 'Input Indikator',
        subTitle: `Masukkan data indikator kedalam sistem`,
        isYearPickerEnabled: false,
      });
    }
  }, [location, roleID, isLoading]);

  return isLoading ? (
    <IndicatorInputSkeleton />
  ) : roleID === 9 ? (
    <Fragment>
      <BulkInputController />
      <FormInputController />
    </Fragment>
  ) : (
    <Navigate to={'/not-found'} />
  );
};

export default IndicatorInput;
