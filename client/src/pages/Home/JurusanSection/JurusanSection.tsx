import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Grid from '@/components/UI/Grid';
import tifLogo from '@/assets/logo-jurusan/tif-logo.png';
import siLogo from '@/assets/logo-jurusan/si-logo.png';
import tekkomLogo from '@/assets/logo-jurusan/tekkom-logo.png';
import ptiLogo from '@/assets/logo-jurusan/pti-logo.png';
import tiLogo from '@/assets/logo-jurusan/ti-logo.png';
import mikLogo from '@/assets/logo-jurusan/mik-logo.png';
import Card from '@/components/UI/Card';
import { Header } from '@/components/UI/Typography';
import { GREY } from '@/components/theme/Colors';
import type { MajorOverviewNormalized } from '@/repository/query/MajorOverviewQuery/types';

import JurusanCard from './JurusanCard';

interface JurusanSectionProps {
  major: MajorOverviewNormalized[];
  yearLength: number;
}

const JurusanSection: FC<JurusanSectionProps> = (props) => {
  const { major, yearLength } = props;

  const dummy = [
    { jurusan: 'Teknik Informatika', imageSrc: tifLogo },
    { jurusan: 'Teknik Komputer', imageSrc: tekkomLogo },
    { jurusan: 'Sistem Informasi', imageSrc: siLogo },
    { jurusan: 'Teknologi Informasi', imageSrc: tiLogo },
    { jurusan: 'Pendidikan Teknologi Informasi', imageSrc: ptiLogo },
    { jurusan: 'Magister Ilmu Komputer', imageSrc: mikLogo },
  ];

  return (
    <Card sx={{ mt: 2 }}>
      <Header
        text={`Perkembangan indikator pada setiap jurusan selama ${yearLength} tahun terakhir`}
      />
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <Grid
          spacing={1}
          gridItem={[
            major.map((item, idx) => (
              <Box key={idx} sx={{ mb: 1 }}>
                <JurusanCard major={item} />
              </Box>
            )),
          ]}
        />
      </Box>
    </Card>
  );
};

export default JurusanSection;
