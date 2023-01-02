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

  const { data: yearData, isLoading: isYearLoading } = useYearQuery();
  const { data: indicatorData, isLoading: isIndicatorLoading } =
    useIndicatorByYear(currentYear, currentYear !== '');

  useEffect(() => {
    if (!searchParams.get('year') && !isYearLoading) {
      setSearchParams({ year: String(yearData[yearData.length - 1].year_id) });
    }
  }, [searchParams, isYearLoading, yearData]);

  return (
    <>
      <Helmet>
        <title>List Indikator | SI-MIKU</title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'middle',
            pb: 2,
          }}
        >
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              Dashboard
            </Typography>
            <Typography variant="h2">List Indikator</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
              Menampilkan List Indikator pada tahun {currentYear}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <ToolbarSection yearData={yearData} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
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
