import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';

import CustomCard from '@/components/CustomCard';
import { GREY } from '@/theme/Colors';
import { Header, SubHeader } from '@/components/Typography';
import type { IndicatorByIdNormalized } from '@/repository/query/IndicatorByIdQuery/types';

import JurusanTable from './JurusanTable';

interface JurusanSectionProps {
  isIndicatorLoading: boolean;
  indicatorData: IndicatorByIdNormalized;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { indicatorData, isIndicatorLoading } = props;

  return (
    <CustomCard>
      <Box>
        <Header text="Data indikator pada jurusan" />
        <SubHeader text="Menampilkan data indikator pada seluruh jurusan" />
      </Box>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <JurusanTable
          indicatorData={indicatorData}
          isIndicatorLoading={isIndicatorLoading}
        />
      </Box>
    </CustomCard>
  );
};

export default JurusanSection;
