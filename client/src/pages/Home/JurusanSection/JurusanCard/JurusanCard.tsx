import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';

import { ERROR, GREY, PRIMARY, SUCCESS } from '@/theme/Colors';

import CountCard from '@/pages/Home/CardCountSection/CountCard';

import IndicatorChart from './IndicatorChart';

interface JurusanCardProps {
  jurusan: string;
  imageSrc: string;
}

const JurusanCard: FC<JurusanCardProps> = (props) => {
  const { jurusan, imageSrc } = props;

  return (
    <CustomCard>
      <Stack flexDirection="row" alignItems="center">
        <Avatar
          src={imageSrc}
          alt="tif"
          variant="rounded"
          sx={{ width: 'fit-content' }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Header text={jurusan} variant="h6" />
      </Stack>
      <Box
        sx={{
          p: 1,
          mt: 2,
          backgroundColor: GREY[200],
          borderRadius: 1,
        }}
      >
        <CustomGrid
          sm={[4, 4, 4]}
          spacing={1}
          gridItem={[
            <CountCard
              backgroundColor={PRIMARY.dark}
              Icon={TrackChangesIcon}
              value="120"
              text="Total indikator"
            />,
            <CountCard
              backgroundColor={SUCCESS.dark}
              Icon={DoneAllIcon}
              value="50"
              text="Indikator memenuhi target"
            />,
            <CountCard
              backgroundColor={ERROR.dark}
              Icon={DoNotDisturbIcon}
              value="70"
              text="Indikator belum memenuhi target"
            />,
            // <IndicatorChart />,
          ]}
        />
      </Box>
    </CustomCard>
  );
};

export default JurusanCard;
