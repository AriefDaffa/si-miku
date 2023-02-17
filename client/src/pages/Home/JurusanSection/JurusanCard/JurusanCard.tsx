import type { FC } from 'react';

import Box from '@mui/material/Box';

import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';
import CountCard from '@/components/CountCard';
import ProgressCard from '@/components/ProgressCard';
import { Header } from '@/components/Typography';
import { getPercentage } from '@/utils/get-percentage';
import { ERROR, GREY, SUCCESS } from '@/theme/Colors';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';

interface JurusanCardProps {
  major: MajorOverviewNormalized;
}

const JurusanCard: FC<JurusanCardProps> = (props) => {
  const { major } = props;

  return (
    <CustomCard>
      <Header text={major.majorName} />
      <Box
        sx={{
          backgroundColor: GREY[200],
          p: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <CustomGrid
          sm={[4, 4, 4]}
          spacing={1}
          gridItem={[
            <CountCard
              backgroundColor={SUCCESS.dark}
              value={`${major.total.fulfilled}`}
              text="Indikator memenuhi target"
            />,
            <CountCard
              backgroundColor={ERROR.dark}
              value={`${major.total.failed}`}
              text="Indikator belum memenuhi target"
            />,
            <ProgressCard
              value={getPercentage(
                major.total.fulfilled,
                major.total.fulfilled + major.total.failed
              )}
            />,
          ]}
        />
      </Box>
    </CustomCard>
  );
};

export default JurusanCard;
