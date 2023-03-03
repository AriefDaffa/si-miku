import type { FC } from 'react';

import Box from '@mui/material/Box';

import Grid from '@/components/UI/Grid';
import Card from '@/components/UI/Card';
import CountCard from '@/components/UI/CountCard';
import ProgressCard from '@/components/UI/ProgressCard';
import { Header } from '@/components/UI/Typography';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';
import { getPercentage } from '@/utils/get-percentage';
import type { IndicatorCountNormalized } from '@/repository/query/IndicatorCountQuery/types';

import LineChart from './LineChart';

interface CardCountSectionProps {
  indicator: IndicatorCountNormalized;
}

const CardCountSection: FC<CardCountSectionProps> = (props) => {
  const { indicator } = props;

  return (
    <Card>
      <Header
        text={`Perkembangan indikator pada ${indicator.years.length} tahun terakhir`}
      />
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <Grid
          sm={[4, 4, 4]}
          spacing={1}
          gridItem={[
            <CountCard
              backgroundColor={SUCCESS.dark}
              value={`${indicator.total.fulfilled}`}
              text="Indikator memenuhi target"
            />,
            <CountCard
              backgroundColor={ERROR.dark}
              value={`${indicator.total.failed}`}
              text="Indikator belum memenuhi target"
            />,
            <ProgressCard
              headertext="Progress indikator"
              value={getPercentage(
                indicator.total.fulfilled,
                indicator.total.fulfilled + indicator.total.failed
              )}
            />,
            <LineChart years={indicator.years} />,
            // <JurusanCard majorData={major} />,
            // <ProgressChart
            //   fulfilledVal={indicator.totalFulfilled}
            //   failedVal={indicator.totalFailed}
            // />,
          ]}
        />
      </Box>
    </Card>
  );
};

export default CardCountSection;
