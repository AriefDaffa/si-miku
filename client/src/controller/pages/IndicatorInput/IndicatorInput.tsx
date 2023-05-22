import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import type { FC } from 'react';

import { useHeadline } from '@/controller/context/HeadlineContext';
import { useAuthContext } from '@/controller/context/AuthContext';

import BulkInputController from './BulkInputController';
import FormInputController from './FormInputController';

const IndicatorInput: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setHeadline } = useHeadline();
  const { roleID, isLoading } = useAuthContext();

  // @TODO improve private routing
  useEffect(() => {
    if (roleID !== 2 && !isLoading) {
      navigate('/not-found');
    }

    if (location.pathname === '/dashboard/indicator-input') {
      setHeadline({
        title: 'Input Indikator',
        subTitle: `Masukkan data indikator kedalam sistem`,
        isYearPickerEnabled: false,
      });
    }
  }, [location, roleID, isLoading]);

  return (
    <Fragment>
      <BulkInputController />
      <FormInputController />
    </Fragment>
  );
};

export default IndicatorInput;
