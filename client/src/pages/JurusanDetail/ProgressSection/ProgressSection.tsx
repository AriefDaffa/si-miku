import type { FC } from 'react';

import Box from '@mui/material/Box';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomCard from '@/components/UI/CustomCard';
import CustomGrid from '@/components/UI/CustomGrid';
import ProgressCard from '@/components/UI/ProgressCard';
import { getPercentage } from '@/utils/get-percentage';
import { Header } from '@/components/UI/Typography';
import { ERROR, GREY, PRIMARY, SUCCESS } from '@/components/theme/Colors';

import CountCard from './CountCard';

interface ProgressSection {
  indicatorCount: number;
  indicatorFulfilled: number;
  indicatorFailed: number;
}

const ProgressSection: FC<ProgressSection> = (props) => {
  const { indicatorCount, indicatorFailed, indicatorFulfilled } = props;

  return (
    <Box>
      <CustomCard>
        <Header text={`Overview perkembangan jurusan`} />
        <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
          <CustomGrid
            sm={[8, 4]}
            spacing={1}
            gridItem={[
              <CustomGrid
                spacing={1}
                gridItem={[
                  //   <CountCard
                  //     title="Jumlah indikator"
                  //     value={`${indicatorCount}`}
                  //     Icon={TrackChangesIcon}
                  //     color={PRIMARY.main}
                  //   />,
                  <CountCard
                    title="Indikator memenuhi target"
                    value={`${indicatorFulfilled}`}
                    Icon={DoneAllIcon}
                    color={SUCCESS.main}
                  />,
                  <CountCard
                    title="Indikator belum memenuhi target"
                    value={`${indicatorFailed}`}
                    Icon={CancelIcon}
                    color={ERROR.main}
                  />,
                ]}
              />,
              <ProgressCard
                value={getPercentage(
                  indicatorFulfilled,
                  indicatorFulfilled + indicatorFailed
                )}
                headertext="Progress Jurusan"
              />,
            ]}
          />
        </Box>
      </CustomCard>
    </Box>
  );
};

export default ProgressSection;
