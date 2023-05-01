import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, ChangeEvent } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import type { SelectChangeEvent } from '@mui/material/Select';

import useDepartmentQuery from '@/repository/query/department/DepartmentQuery';
import DepartmentSelector from '@/presentation/page-component/Department/DepartmentSelector/DepartmentSelector';
import useDepartmentByIdQuery from '@/repository/query/department/DepartmentById/useDepartmentByIdQuery';
import TargetQuarterTable from '@/presentation/page-component/common/TargetQuarterTable/TargetQuarterTable';
import { useHeadline } from '@/controller/context/HeadlineContext';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';
import Grid from '@/presentation/global-component/UI/Grid/Grid';
import Card from '@mui/material/Card';
import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle/AvatarTitle';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

const Home: FC = () => {
  const location = useLocation();

  const { setHeadline } = useHeadline();

  useEffect(() => {
    if (location.pathname === '/dashboard/overview') {
      setHeadline({
        title: 'Overview',
        subTitle: 'Menampilkan progress perkembangan Indikator',
        isYearPickerEnabled: false,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <Grid
        spacing={1}
        sm={[4]}
        gridItem={[
          <Card sx={{ p: 1, border: '1px solid #dadada' }}>
            <Stack justifyContent="space-between">
              <Avatar
                sx={{
                  height: 'max-content',
                  width: 'max-content',
                  p: 0.5,
                  mb: 1,
                  backgroundColor: PRIMARY.main,
                }}
              >
                <TrackChangesIcon />
              </Avatar>
              <Box>
                <SubHeader text="Total Indikator" />
                <Header text="68" variant="h3" />
              </Box>
            </Stack>
          </Card>,
          <Card sx={{ p: 1, border: '1px solid #dadada' }}>1</Card>,
        ]}
      />
      <AvatarTitle
        isImageIcon
        Icon={TrendingUpIcon}
        header="Perkembangan Indikator"
        subHeader="Overview"
        imageURL=""
      />
    </Fragment>
  );
};

export default Home;
