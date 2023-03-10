import { useState } from 'react';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import useIndicatorQuery from '@/repository/query/IndicatorQuery';
import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import Card from '@/components/UI/atoms/Card';
import TableCardProgress from '@/components/UI/molecules/TableCardProgress';
import { GREY, PRIMARY } from '@/components/theme/Colors';
import { Header, PageTitle, SubHeader } from '@/components/UI/atoms/Typography';

import OverviewSection from './OverviewSection';

const Indicator: FC = () => {
  const [indicatorType, setIndicatorType] = useState('1');

  const { data: listIndicator, isLoading: isListIndicatorLoading } =
    useIndicatorQuery();

  const handleIndicatorChange = (e: SelectChangeEvent) => {
    setIndicatorType(e.target.value);
  };

  const dataSwitcher = () => {
    switch (indicatorType) {
      case '1':
        return listIndicator.indicatorList;
      case '2':
        return listIndicator.splittedList.facultyIndicator;
      case '3':
        return listIndicator.splittedList.majorIndicator;
      default:
        return listIndicator.indicatorList;
    }
  };

  return (
    <>
      <Helmet title="List Indikator | SI-MIKU" />
      <Container maxWidth="xl">
        <PageTitle
          title="List Indikator"
          subTitle="Menampilkan seluruh data indikator yang terdapat pada sistem"
        />
        <Grid
          spacing={2}
          gridItem={[
            <OverviewSection data={listIndicator} />,
            <Card>
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Header text="List indikator" />
                <FormControl>
                  <Select
                    value={indicatorType}
                    onChange={handleIndicatorChange}
                  >
                    <MenuItem value={'1'}>Seluruh Indikator</MenuItem>
                    <MenuItem value={'2'}>Indikator Fakultas</MenuItem>
                    <MenuItem value={'3'}>Indikator Departemen</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Box
                sx={{
                  backgroundColor: GREY[200],
                  p: 1,
                  mt: 2,
                  borderRadius: 2,
                }}
              >
                <TableCardProgress
                  data={dataSwitcher()}
                  isLoading={isListIndicatorLoading}
                />
                {/* <TableSection
                  data={dataSwitcher()}
                  isLoading={isListIndicatorLoading}
                /> */}
              </Box>
            </Card>,
          ]}
        />
      </Container>
    </>
  );
};

export default Indicator;
