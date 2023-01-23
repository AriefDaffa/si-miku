import type { FC } from 'react';

import Box from '@mui/material/Box';

import { Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';

import JurusanCard from './JurusanCard';

interface JurusanSectionProps {}

const JurusanSection: FC<JurusanSectionProps> = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Header
        text="Perkembangan indikator berdasarkan jurusan"
        sx={{ mb: 2 }}
      />
      <CustomGrid gridItem={[<JurusanCard />]} />
    </Box>
  );
};

export default JurusanSection;
