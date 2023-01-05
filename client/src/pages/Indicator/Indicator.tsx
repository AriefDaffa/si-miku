import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

import { Container, Typography, Box, Grid } from '@mui/material';

import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery';

import ToolbarSection from './ToolbarSection';
import ChartSection from './ChartSection';
import TableSection from './TableSection';

const Indicator: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get('id') || '';

  const { data: indicatorData, isLoading: isIndicatorLoading } =
    useIndicatorQuery();
  const { data: indicatorByIdData, isLoading: isIndicatorByIdLoading } =
    useIndicatorByIdQuery(params, params !== '');

  const [dataHead] = indicatorData;

  useEffect(() => {
    if (!params && !isIndicatorLoading && dataHead !== void 0) {
      setSearchParams({ id: String(dataHead.indicatorID) });
    }
  }, [searchParams, dataHead, isIndicatorLoading]);

  return (
    <>
      <Helmet>
        <title>Detail Indikator | SI-MIKU</title>
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
            <Typography variant="h2">Detail Indikator</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
              Menampilkan data lebih lanjut mengenai indikator
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ToolbarSection indicator={indicatorData} />
          </Grid>
          <Grid item xs={12}>
            <ChartSection
              indicator={indicatorByIdData}
              isLoading={isIndicatorByIdLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TableSection
              indicator={indicatorByIdData}
              isLoading={isIndicatorByIdLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Indicator;
