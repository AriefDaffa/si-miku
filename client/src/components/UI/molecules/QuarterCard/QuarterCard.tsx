import type { FC } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReportIcon from '@mui/icons-material/Report';

import Grid from '@/components/UI/atoms/Grid';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

interface QuarterCardProps {
  notSet: number;
  failed: number;
  fulfilled: number;
}

const QuarterCard: FC<QuarterCardProps> = (props) => {
  const { failed, fulfilled, notSet } = props;

  return (
    <Grid
      spacing={2}
      sm={[4, 4, 4]}
      sx={{ mb: 2 }}
      gridItem={[
        <Card>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              alignItems="center"
              sx={{
                m: 2,
                p: 1,
                backgroundColor: SUCCESS.light,
                borderRadius: 1,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: '60px', color: SUCCESS.darker }}
              />
            </Stack>
            <Box>
              <SubHeader text="Jumlah jurusan memenuhi target" />
              <Header text={`${fulfilled}`} variant="h4" />
            </Box>
          </Stack>
        </Card>,
        <Card>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              alignItems="center"
              sx={{
                m: 2,
                p: 1,
                backgroundColor: ERROR.light,
                borderRadius: 1,
              }}
            >
              <HighlightOffIcon
                sx={{ fontSize: '60px', color: ERROR.darker }}
              />
            </Stack>
            <Box>
              <SubHeader text="Jumlah jurusan belum memenuhi target" />
              <Header text={`${failed}`} variant="h4" />
            </Box>
          </Stack>
        </Card>,
        <Card>
          <Stack flexDirection="row" alignItems="center">
            <Stack
              alignItems="center"
              sx={{
                m: 2,
                p: 1,
                backgroundColor: GREY[400],
                borderRadius: 1,
              }}
            >
              <ReportIcon sx={{ fontSize: '60px', color: GREY[800] }} />
            </Stack>
            <Box>
              <SubHeader text="Jumlah data belum ditambahkan" />
              <Header text={`${notSet}`} variant="h4" />
            </Box>
          </Stack>
        </Card>,
      ]}
    />
  );
};

export default QuarterCard;
