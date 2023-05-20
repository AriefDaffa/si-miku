import { useLocation } from 'react-router-dom';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';

import Grid from '@/presentation/global-component/UI/Grid/Grid';
import Card from '@mui/material/Card';
import Flexer from '@/presentation/global-component/UI/Flexer/Flexer';
import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';
import { useHeadline } from '@/controller/context/HeadlineContext';

interface OverviewCardProps {
  totalIndicator: number;
  totalDepartment: number;
  totalMajor: number;
}

const OverviewCard: FC<OverviewCardProps> = (props) => {
  const { totalDepartment, totalIndicator, totalMajor } = props;

  return (
    <Grid
      spacing={1}
      sx={{ mb: 2 }}
      gridItem={[
        <Card
          sx={{
            border: '1px solid #dadada',
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Flexer sx={{ mb: 2 }}>
            <TextWithSubHeader header="Total Indikator" subHeader="Jumlah" />
            <Header text={`${totalIndicator}`} variant="h2" />
          </Flexer>
          <Box sx={{ p: 1, backgroundColor: GREY[200], borderRadius: 2 }}>
            <Grid
              spacing={1}
              sm={[6, 6]}
              gridItem={[
                <Card sx={{ p: 2, border: '1px solid #dadada' }}>
                  <Stack
                    flexDirection="row-reverse"
                    justifyContent="space-between"
                  >
                    <Avatar
                      sx={{
                        height: 'max-content',
                        width: 'max-content',
                        p: 0.5,
                        mb: 1,
                        backgroundColor: PRIMARY.main,
                      }}
                    >
                      <AccountBalanceIcon />
                    </Avatar>
                    <Box>
                      <SubHeader text="Indikator pada level Departemen" />
                      <Header text={`${totalDepartment}`} variant="h3" />
                    </Box>
                  </Stack>
                </Card>,
                <Card sx={{ p: 2, border: '1px solid #dadada' }}>
                  <Stack
                    flexDirection="row-reverse"
                    justifyContent="space-between"
                  >
                    <Avatar
                      sx={{
                        height: 'max-content',
                        width: 'max-content',
                        p: 0.5,
                        mb: 1,
                        backgroundColor: PRIMARY.main,
                      }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Box>
                      <SubHeader text="Indikator pada level Program Studi" />
                      <Header text={`${totalMajor}`} variant="h3" />
                    </Box>
                  </Stack>
                </Card>,
              ]}
            />
          </Box>
        </Card>,
      ]}
    />
  );
};

export default OverviewCard;
