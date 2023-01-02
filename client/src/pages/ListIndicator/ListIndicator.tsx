import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

import { Container, Typography, Box, Grid } from '@mui/material';

import useYearQuery from '@/repository/query/YearQuery/useYearQuery';
import useIndicatorByYear from '@/repository/query/IndicatorByYearQuery';

import TableSection from './TableSection';
import ChartSection from './ChartSection';
import ToolbarSection from './ToolbarSection';

const ListIndicator: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentYear = searchParams.get('year') || '';

  const { data, isLoading } = useYearQuery();
  const { data: indicatorData, isLoading: isIndicatorLoading } =
    useIndicatorByYear(currentYear, currentYear !== '');

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
              Menampilkan List Indikator pada tahun {currentYear}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ToolbarSection yearData={data} />
          </Grid>
          <Grid item xs={12}>
            <ChartSection indicatorData={indicatorData} />
          </Grid>
          <Grid item xs={12}>
            <TableSection
              indicatorData={indicatorData}
              isIndicatorLoading={isIndicatorLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ListIndicator;
