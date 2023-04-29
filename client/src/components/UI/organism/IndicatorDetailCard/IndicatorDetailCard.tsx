import { FC } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import Pill from '@/components/UI/atoms/Pill';
// import ProgressCard from '@/components/UI/molecules/ProgressCard';
// import TargetQuarterChart from '@/components/UI/molecules/TargetQuarterChart';
import { getPercentage } from '@/controller/utils/get-percentage';
import { getProgressColor } from '@/controller/utils/get-progress-bar-color';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import type { TargetQuarterNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface IndicatorDetailCardProps {
  selectedYear: string;
  targetQuarter: TargetQuarterNormalized;
}

const IndicatorDetailCard: FC<IndicatorDetailCardProps> = (props) => {
  const { targetQuarter, selectedYear } = props;

  const total =
    targetQuarter.q1 + targetQuarter.q2 + targetQuarter.q3 + targetQuarter.q4;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: GREY[200],
          p: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Grid
          spacing={1}
          // sm={[12, 6, 12]}
          gridItem={[
            <Card>
              <Box>
                <Header text={`Progress Indikator`} />
              </Box>
              <Box
                sx={{
                  backgroundColor: GREY[200],
                  p: 1,
                  mt: 2,
                  borderRadius: 2,
                }}
              >
                <Grid
                  spacing={1}
                  sm={[6, 6]}
                  gridItem={[
                    // <ProgressCard
                    //   headertext="Persentase perkembangan"
                    //   value={total}
                    //   maxValue={targetQuarter.targetValue}
                    // />,
                    <Card>
                      <SubHeader text="Status indikator" />
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '100%' }}
                      >
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            mb: 1,
                            backgroundColor:
                              targetQuarter.isTargetFulfilled === false
                                ? ERROR.main
                                : SUCCESS.main,
                          }}
                        >
                          {targetQuarter.isTargetFulfilled === false ? (
                            <CancelIcon />
                          ) : (
                            <DoneAllIcon />
                          )}
                        </Avatar>
                        <Pill
                          isError={targetQuarter.isTargetFulfilled === false}
                        >
                          <Header
                            variant="subtitle2"
                            text={`${
                              targetQuarter.isTargetFulfilled === true
                                ? 'Memenuhi'
                                : 'Belum Memenuhi'
                            }`}
                          />
                        </Pill>
                      </Stack>
                    </Card>,
                  ]}
                />
              </Box>
            </Card>,
            <Card>
              <Box>
                <Header text={`Data perkembangan indikator`} />
              </Box>
              <Box
                sx={{
                  backgroundColor: GREY[200],
                  p: 1,
                  mt: 2,
                  borderRadius: 2,
                }}
              >
                <Grid
                  spacing={1}
                  sm={[3, 3, 3, 3]}
                  gridItem={[
                    <Card>
                      <SubHeader text={'Kuartil 1'} />
                      <Header text={`${targetQuarter.q1}`} />
                      <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                        <SubHeader text="Januari - Maret" />
                      </Box>
                    </Card>,
                    <Card>
                      <SubHeader text={'Kuartil 2'} />
                      <Header text={`${targetQuarter.q2}`} />
                      <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                        <SubHeader text="April - Juni" />
                      </Box>
                    </Card>,
                    <Card>
                      <SubHeader text={'Kuartil 3'} />
                      <Header text={`${targetQuarter.q3}`} />
                      <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                        <SubHeader text="Juli - September" />
                      </Box>
                    </Card>,
                    <Card>
                      <SubHeader text={'Kuartil 4'} />
                      <Header text={`${targetQuarter.q4}`} />
                      <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                        <SubHeader text="Oktober - Desember" />
                      </Box>
                    </Card>,
                    <Card>
                      <Stack
                        direction={{ sm: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <SubHeader text={'Total Data'} />
                          <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                            <SubHeader text="Total data Q1 - Q4 (Januari - Desember)" />
                          </Box>
                        </Box>
                        <Header
                          text={`${total}`}
                          variant="h4"
                          sx={{
                            color: getProgressColor(
                              getPercentage(total, targetQuarter.targetValue)
                            ),
                          }}
                        />
                      </Stack>
                    </Card>,
                    <Card>
                      <Stack
                        direction={{ sm: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <SubHeader text={'Target'} />
                          <Box sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                            <SubHeader text="Target yang harus dicapai" />
                          </Box>
                        </Box>
                        <Header
                          text={`${targetQuarter.targetValue}`}
                          variant="h4"
                        />
                      </Stack>
                    </Card>,
                  ]}
                />
              </Box>
            </Card>,
            // <TargetQuarterChart
            //   item={targetQuarter}
            //   selectedYear={selectedYear}
            // />,
          ]}
        />
      </Box>
    </Box>
  );
};

export default IndicatorDetailCard;
