import { useMemo, useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import useChartStyle from '@/hooks/use-chart-style';
import Card from '@/components/UI/atoms/Card';
import CustomChart, { ChartTypes } from '@/components/UI/atoms/CustomChart';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';
import type { IndicatorOverviewNormalized } from '@/repository/query/OverviewIndicator';
import Grid from '@/components/UI/atoms/Grid';

interface ChartSectionProps {
  isLoading: boolean;
  IndicatorOverview: IndicatorOverviewNormalized;
}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const { isLoading, IndicatorOverview } = props;

  const [chartType, setchartType] = useState<ChartTypes>('area');

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    colors: [SUCCESS.dark, ERROR.dark],
    markers: {
      size: 5,
    },
    chart: {
      animations: {
        enabled: false,
      },
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Indikator memenuhi target',
        data: IndicatorOverview.indicatorYear.map((item) => {
          return {
            x: item.yearValue,
            y: item.fulfilled,
          };
        }),
      },
      {
        name: 'Indikator belum memenuhi target',
        data: IndicatorOverview.indicatorYear.map((item) => {
          return {
            x: item.yearValue,
            y: item.failed,
          };
        }),
      },
    ];
  }, [IndicatorOverview]);

  const handleChartTypeChange = (e: SelectChangeEvent) => {
    setchartType(e.target.value as ChartTypes);
  };

  return (
    <Card>
      <Stack flexDirection="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Header text="Grafik perkembangan indikator" />
          <SubHeader text="Menampilkan perkembangan indikator dari tahun ke tahun" />
        </Box>
        <Box>
          <FormControl>
            <Select
              defaultValue={'area'}
              value={chartType}
              onChange={handleChartTypeChange}
            >
              <MenuItem value="area">Area Chart</MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Box
        sx={{
          minHeight: 600,
          backgroundColor: GREY[200],
          p: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Card>
          {/* <Divider sx={{ mt: 2, mb: 1 }} /> */}
          <Grid
            sm={[6, 6]}
            gridItem={[
              <Box>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ minHeight: 80 }}
                >
                  <Box>
                    <SubHeader text="Jumlah data yang memenuhi" />
                    <Header
                      text={`${IndicatorOverview.totalFulfilled}`}
                      variant="h3"
                    />
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: SUCCESS.main,
                      width: 44,
                      height: 44,
                    }}
                  >
                    <DoneAllIcon />
                  </Avatar>
                </Stack>
              </Box>,
              <Box>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ minHeight: 80 }}
                >
                  <Box>
                    <SubHeader text="Jumlah data yang belum memenuhi" />
                    <Header
                      text={`${IndicatorOverview.totalFailed}`}
                      variant="h3"
                    />
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: ERROR.main,
                      width: 44,
                      height: 44,
                    }}
                  >
                    <CancelIcon />
                  </Avatar>
                </Stack>
              </Box>,
            ]}
          />
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Box>
            {isLoading ? (
              <Skeleton height={400} />
            ) : (
              <div>
                <CustomChart
                  chartOptions={chartOptions}
                  series={series}
                  type={chartType}
                  height={400}
                />
              </div>
            )}
          </Box>
        </Card>
      </Box>
    </Card>
  );
};

export default ChartSection;
