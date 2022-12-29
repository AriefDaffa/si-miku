import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

import CardCountSection from './CardCountSection';
import ChartSection from './ChartSection';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | SI-Miku</title>
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
            <Typography variant="h2">Overview</Typography>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
              Menampilkan Overview indikator
            </Typography>
          </Box>

          {/* <Box sx={{ display: 'flex', float: 'right', alignItems: 'center' }}>
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                autoWidth
                defaultValue={0}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={0}>Semua</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </Box>

        <CardCountSection />
        <ChartSection />
      </Container>
    </>
  );
};

export default Home;
