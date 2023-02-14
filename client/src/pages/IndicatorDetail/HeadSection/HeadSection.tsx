import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
          <Typography variant="h2">{indicatorName}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeadSection;
