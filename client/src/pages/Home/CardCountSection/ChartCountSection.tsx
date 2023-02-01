import type { FC } from 'react';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { ERROR, SUCCESS } from '@/theme/Colors';
import CustomGrid from '@/components/CustomGrid';
import type { IndicatorCountNormalized } from '@/repository/query/IndicatorCountQuery/types';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';

import CountCard from './CountCard';
import ProgressChart from './ProgressChart';
import LineChart from './LineChart';
import CustomCard from '@/components/CustomCard';
import JurusanCard from './JurusanCard';

interface CardCountSectionProps {
  major: MajorOverviewNormalized[];
  indicator: IndicatorCountNormalized;
}

const CardCountSection: FC<CardCountSectionProps> = (props) => {
  const { major, indicator } = props;

  return (
    <CustomGrid
      sm={[6, 6, 12, 8, 4]}
      sx={{ pt: 2 }}
      gridItem={[
        <CountCard
          backgroundColor={SUCCESS.dark}
          Icon={DoneAllIcon}
          value={`${indicator.totalFulfilled}`}
          text="Indikator memenuhi target"
        />,
        <CountCard
          backgroundColor={ERROR.dark}
          Icon={DoNotDisturbIcon}
          value={`${indicator.totalFailed}`}
          text="Indikator belum memenuhi target"
        />,
        <LineChart years={indicator.years} />,
        <JurusanCard majorData={major} />,
        <ProgressChart
          fulfilledVal={indicator.totalFulfilled}
          failedVal={indicator.totalFailed}
        />,
      ]}
    />
  );
};

export default CardCountSection;
