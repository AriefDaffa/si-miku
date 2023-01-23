import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import type { FC } from 'react';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { ERROR, SUCCESS } from '@/theme/Colors';
import CustomGrid from '@/components/CustomGrid';
import type { YearDataNormalized } from '@/repository/query/YearQuery/types';
import type { IndicatorCountNormalized } from '@/repository/query/IndicatorCountQuery/types';

import CountCard from './CountCard';
import ProgressChart from './ProgressChart';
import LineChart from './LineChart';
import { defaultVal } from './constant';

interface CardCountSectionProps {
  year: YearDataNormalized[];
  indicator: IndicatorCountNormalized[];
}

const CardCountSection: FC<CardCountSectionProps> = (props) => {
  const { year, indicator } = props;

  const getValue = useMemo(() => {
    if (!indicator || indicator.length === 0) {
      return defaultVal;
    }

    const fulfilledVal = indicator.find(
      (item) => item.isTargetFulfilled === true
    );
    const failedVal = indicator.find(
      (item) => item.isTargetFulfilled === false
    );

    return {
      fulfilledCount: fulfilledVal?.totalCount || defaultVal.fulfilledCount,
      failedCount: failedVal?.totalCount || defaultVal.failedCount,
      fulfilledVal: fulfilledVal || defaultVal.fulfilledVal,
      failedVal: failedVal || defaultVal.failedVal,
    };
  }, [indicator]);

  return (
    <CustomGrid
      sm={[6, 6]}
      sx={{ pt: 3 }}
      gridItem={[
        <LineChart
          fulfilledVal={getValue.fulfilledVal}
          failedVal={getValue.failedVal}
        />,
        <CustomGrid
          sm={[6, 6]}
          gridItem={[
            <CountCard
              backgroundColor={SUCCESS.dark}
              Icon={DoneAllIcon}
              value={`${getValue.fulfilledCount}`}
              text="Indikator memenuhi target"
            />,
            <CountCard
              backgroundColor={ERROR.dark}
              Icon={DoNotDisturbIcon}
              value={`${getValue.failedCount}`}
              text="Indikator belum memenuhi target"
            />,
            <ProgressChart
              fulfilledVal={getValue.fulfilledCount}
              failedVal={getValue.failedCount}
            />,
          ]}
        />,
      ]}
    />
  );
};

export default CardCountSection;
