import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SubHeader } from '@/components/UI/Typography';

interface HeadSectionProps {
  indicatorName: string;
}

const HeadSection: FC<HeadSectionProps> = (props) => {
  const { indicatorName } = props;

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/dashboard/indicator', { replace: true });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'middle',
      }}
    >
      <Box>
        <Stack
          flexDirection="row"
          alignItems="center"
          onClick={handleBackButton}
          sx={{
            width: 'min-content',
            ':hover': { cursor: 'pointer' },
          }}
        >
          <ArrowBackIosIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <SubHeader text="Kembali" />
        </Stack>
        <Stack flexDirection="column" sx={{ my: 1 }}>
          <Typography variant="h2">{indicatorName}</Typography>
          <SubHeader text="Menampilkan detail data pada indikator" />
        </Stack>
      </Box>
    </Box>
  );
};

export default HeadSection;
