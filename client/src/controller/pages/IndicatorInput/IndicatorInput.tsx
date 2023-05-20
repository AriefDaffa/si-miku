import { useLocation } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import type { FC } from 'react';

import { useHeadline } from '@/controller/context/HeadlineContext';

import BulkInputController from './BulkInputController';
import FormInputController from './FormInputController';

const IndicatorInput: FC = () => {
  const location = useLocation();

  const { setHeadline } = useHeadline();

  useEffect(() => {
    if (location.pathname === '/dashboard/indicator-input') {
      setHeadline({
        title: 'Input Indikator',
        subTitle: `Masukkan data indikator kedalam sistem`,
        isYearPickerEnabled: false,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <BulkInputController />
      <FormInputController />
    </Fragment>
  );
};

export default IndicatorInput;
