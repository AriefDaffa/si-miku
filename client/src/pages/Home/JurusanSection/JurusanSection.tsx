import type { FC } from 'react';

import Box from '@mui/material/Box';

import { Header } from '@/components/Typography';
import CustomGrid from '@/components/CustomGrid';
import tifLogo from '@/assets/logo-jurusan/tif-logo.png';
import siLogo from '@/assets/logo-jurusan/si-logo.png';
import tekkomLogo from '@/assets/logo-jurusan/tekkom-logo.png';
import ptiLogo from '@/assets/logo-jurusan/pti-logo.png';
import tiLogo from '@/assets/logo-jurusan/ti-logo.png';
import mikLogo from '@/assets/logo-jurusan/mik-logo.png';

import JurusanCard from './JurusanCard';

interface JurusanSectionProps {}

const JurusanSection: FC<JurusanSectionProps> = () => {
  const dummy = [
    { jurusan: 'Teknik Informatika', imageSrc: tifLogo },
    { jurusan: 'Teknik Komputer', imageSrc: tekkomLogo },
    { jurusan: 'Sistem Informasi', imageSrc: siLogo },
    { jurusan: 'Teknologi Informasi', imageSrc: tiLogo },
    { jurusan: 'Pendidikan Teknologi Informasi', imageSrc: ptiLogo },
    { jurusan: 'Magister Ilmu Komputer', imageSrc: mikLogo },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Header
        text="Perkembangan indikator berdasarkan jurusan"
        sx={{ mb: 2 }}
      />
      <CustomGrid
        gridItem={[
          dummy.map((data, idx) => (
            <Box key={idx} sx={{ mb: 4 }}>
              <JurusanCard jurusan={data.jurusan} imageSrc={data.imageSrc} />
            </Box>
          )),
        ]}
      />
    </Box>
  );
};

export default JurusanSection;
