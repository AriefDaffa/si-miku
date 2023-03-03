import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import Card from '@/components/UI/Card';
import Grid from '@/components/UI/Grid';
import CountCard from '@/components/UI/CountCard';
import ProgressCard from '@/components/UI/ProgressCard';
import { Header } from '@/components/UI/Typography';
import { getPercentage } from '@/utils/get-percentage';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';

interface JurusanCardProps {
  major: MajorOverviewNormalized;
}

const JurusanCard: FC<JurusanCardProps> = (props) => {
  const { major } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 1 }}
      >
        <Avatar
          src={major.majorImage}
          alt="tif"
          variant="rounded"
          sx={{ width: 'fit-content' }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Header text={major.majorName} />
      </Stack>

      <Box
        sx={{
          backgroundColor: GREY[200],
          p: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Grid
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
              headertext="Progress jurusan"
              value={getPercentage(
                major.total.fulfilled,
                major.total.fulfilled + major.total.failed
              )}
            />,
          ]}
        />
      </Box>
    </Card>
  );
};

export default JurusanCard;
