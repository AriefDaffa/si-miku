import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

import { Container, Typography, Box } from '@mui/material';

import useYearQuery from '@/repository/query/YearQuery/useYearQuery';

import TableSection from './TableSection';

const ListIndicator: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useYearQuery();

  useEffect(() => {
    if (!searchParams.get('year') && !isLoading) {
      setSearchParams({ year: String(data[data.length - 1].year_id) });
    }
  }, [searchParams, isLoading, data]);

  return (
    <>
      <Helmet>
        <title>List Indikator | SI-MIKU</title>
      </Helmet>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'middle',
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              Dashboard
            </Typography>
            <Typography variant="h2">List Indikator</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
              Menampilkan List Indikator
            </Typography>
          </Box>
        </Box>

        {/* TABLE SECTION */}
        <TableSection
          currentYear={searchParams.get('year') || ''}
          year={data}
        />
      </Container>
    </>
  );
};

export default ListIndicator;
