import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import tifLogo from '@/assets/logo-jurusan/tif-logo.png';
import siLogo from '@/assets/logo-jurusan/si-logo.png';
import tekkomLogo from '@/assets/logo-jurusan/tekkom-logo.png';
import ptiLogo from '@/assets/logo-jurusan/pti-logo.png';
import tiLogo from '@/assets/logo-jurusan/ti-logo.png';
import mikLogo from '@/assets/logo-jurusan/mik-logo.png';
import type { IndicatorByMajorNormalized } from '@/repository/query/IndicatorByMajorQuery/types';

interface HeadSectionProps {
  id: string;
  majorData: IndicatorByMajorNormalized;
}

const HeadSection: FC<HeadSectionProps> = (props) => {
  const { majorData, id } = props;

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/dashboard/jurusan', { replace: true });
  };

  const logo = [
    { id: 1, image: tifLogo },
    { id: 2, image: tekkomLogo },
    { id: 3, image: siLogo },
    { id: 4, image: tiLogo },
    { id: 5, image: ptiLogo },
    { id: 6, image: mikLogo },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'middle',
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.7, ':hover': { cursor: 'pointer' } }}
          onClick={handleBackButton}
        >
          <Stack flexDirection="row" alignItems="center">
            <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
            <div>Kembali</div>
          </Stack>
        </Typography>
        <Stack
          alignItems="center"
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ my: 1 }}
        >
          <Avatar
            src={logo.find((item) => `${item.id}` === id)?.image}
            alt="tif"
            variant="rounded"
            sx={{ width: 'fit-content' }}
          />
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Typography variant="h2">{majorData.majorName}</Typography>
        </Stack>
        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
          Menampilkan indikator jurusan {majorData.majorName}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeadSection;
