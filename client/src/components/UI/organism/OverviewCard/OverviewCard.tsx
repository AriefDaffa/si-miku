import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import BarChartIcon from '@mui/icons-material/BarChart';

import Grid from '@/presentation/global-component/UI/Grid';
import CardCount from '@/pages/Home/CardCount';
import ProgressCard from '@/components/UI/molecules/ProgressCard';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import { getPercentage } from '@/controller/utils/get-percentage';
import {
  ERROR,
  GREY,
  PRIMARY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery';

interface OverviewCardProps {
  isDepartment: boolean;
  notSet: number;
  fulfilled: number;
  failed: number;
  selectedYear: string;
  totalData: number;
}

const OverviewCard: FC<OverviewCardProps> = (props) => {
  const {
    fulfilled,
    failed,
    notSet,
    selectedYear,
    totalData,
    isDepartment = false,
  } = props;

  return (
    <Box>
      <Card sx={{ backgroundColor: PRIMARY.main }}>
        <Stack
          direction={{ sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 1, color: 'white' }}
        >
          <Stack
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ my: 1 }}
          >
            <BarChartIcon fontSize="large" />
            <Divider
              orientation="vertical"
              flexItem
              color="white"
              sx={{ mx: 2 }}
            />
            <TextWithSubHeader
              subHeader="Overview"
              header={
                isDepartment
                  ? `Total data Departemen pada tahun ${selectedYear}`
                  : `Total data Program Studi pada tahun ${selectedYear}`
              }
            />
          </Stack>
          <Header text={`${totalData}`} variant="h2" />
        </Stack>
        <Grid
          sm={[4, 4, 4]}
          sx={{ p: 2 }}
          spacing={1}
          gridItem={[
            <Card sx={{ p: 1 }}>
              <Header
                text={`${fulfilled}`}
                variant="h2"
                sx={{ textAlign: 'center', color: SUCCESS.main }}
              />
              <SubHeader
                text="Data memenuhi target"
                sx={{ textAlign: 'center' }}
              />
            </Card>,
            <Card sx={{ p: 1 }}>
              <Header
                text={`${failed}`}
                variant="h2"
                sx={{ textAlign: 'center', color: ERROR.main }}
              />
              <SubHeader
                text="Data belum memenuhi target"
                sx={{ textAlign: 'center' }}
              />
            </Card>,
            <Card sx={{ p: 1 }}>
              <Header
                text={`${notSet}`}
                variant="h2"
                sx={{ textAlign: 'center', color: GREY[800] }}
              />
              <SubHeader
                text="Data belum ditambahkan"
                sx={{ textAlign: 'center' }}
              />
            </Card>,
          ]}
        />
      </Card>
    </Box>
  );
};

export default OverviewCard;
