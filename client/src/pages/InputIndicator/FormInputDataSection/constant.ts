import tifLogo from '@/assets/logo-jurusan/tif-logo.png';
import siLogo from '@/assets/logo-jurusan/si-logo.png';
import tekkomLogo from '@/assets/logo-jurusan/tekkom-logo.png';
import ptiLogo from '@/assets/logo-jurusan/pti-logo.png';
import tiLogo from '@/assets/logo-jurusan/ti-logo.png';
import mikLogo from '@/assets/logo-jurusan/mik-logo.png';

export const jurusanData = [
  { itemTitle: 'Teknik Informatika', logo: tifLogo },
  { itemTitle: 'Teknik Komputer', logo: tekkomLogo },
  { itemTitle: 'Sistem Informasi', logo: siLogo },
  { itemTitle: 'Teknologi Informasi', logo: tiLogo },
  { itemTitle: 'Pendidikan Teknologi Informasi', logo: ptiLogo },
  { itemTitle: 'Magister Ilmu Komputer', logo: mikLogo },
];

export const defaultValues = {
  indicator_id: 0,
  indicator_data: [
    {
      major_id: 1,
      indicator_value: [
        {
          year_value: 2017,
          target_value: 0,
          q1: 0,
          q2: 0,
          q3: 0,
          q4: 0,
        }
      ]
    }
  ]
};
