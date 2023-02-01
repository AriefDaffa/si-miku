import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { PageTitle } from '@/components/Typography';

import CustomGrid from '@/components/CustomGrid';
import Helmet from '@/components/Helmet';
import useIndicatorByMajorQuery from '@/repository/query/IndicatorByMajorQuery';

const JurusanDetail: FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id || '';

  const { data: major, isLoading: isMajorLoading } =
    useIndicatorByMajorQuery(id);

  const handleBackButton = () => {
    navigate('/dashboard/jurusan', { replace: true });
  };

  return (
    <>
      <Helmet title={`${123} | SI-MIKU`} />
      <Container maxWidth="xl">
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
            <Typography variant="h2">{major.majorName}</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
              Menampilkan indikator jurusan {major.majorName}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default JurusanDetail;
