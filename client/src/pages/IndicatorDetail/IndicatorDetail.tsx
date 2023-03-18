import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Helmet from '@/components/UI/atoms/Helmet';
import useIndicatorByIdQuery from '@/repository/query/IndicatorByIdQuery';
import Grid from '@/components/UI/atoms/Grid';
import ChartCard from '@/components/UI/molecules/ChartCard';
import Card from '@/components/UI/atoms/Card';
import { Header } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';
import { useAuthContext } from '@/context/AuthContext';
import type { TargetQuarterNormalized } from '@/repository/query/IndicatorByIdQuery';

import HeadSection from './HeadSection';
import DataYearTable from './DataYearSection';
import OverviewSection from './OverviewSection';
import ProgressDialog from './ProgressDialog';
import InputDataFaculty from './InputDataFaculty';
import InputDataMajor from './InputDataMajor';
import { defaultSelected } from './constant';

const IndicatorDetail: FC = () => {
  const params = useParams();

  const [currentData, setCurrentData] =
    useState<TargetQuarterNormalized>(defaultSelected);
  const [openDetail, setOpenDetail] = useState(false);

  const id = params.id || '';

  const { data: indicator, isLoading: isIndicatorLoading } =
    useIndicatorByIdQuery(id);
  const { isManagement } = useAuthContext();

  if (!isIndicatorLoading && indicator.indicatorCode === '') {
    return <Navigate to="/not-found" />;
  }

  const isFaculty = indicator.isFacultyIndicator === true;

  const setSelectedData = (data: TargetQuarterNormalized) => {
    setCurrentData(data);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <Helmet title={`${indicator.indicatorName} | SI-MIKU`} />
      <Container maxWidth="xl">
        <HeadSection
          indicatorName={`${indicator.indicatorCode} ${indicator.indicatorName}`}
        />
        <Grid
          gridItem={[
            <OverviewSection
              indicatorData={indicator}
              isIndicatorLoading={isIndicatorLoading}
            />,
            <ChartCard
              indicatorData={indicator.facultyIndicators.data}
              isIndicatorLoading={isIndicatorLoading}
            />,
            isFaculty ? (
              <Box>
                {isManagement && (
                  <Box sx={{ mb: 3 }}>
                    <InputDataFaculty indicatorID={indicator.indicatorID} />
                  </Box>
                )}
                <DataYearTable
                  indicatorID={indicator.indicatorID}
                  isLoading={isIndicatorLoading}
                  setSelectedData={setSelectedData}
                  data={indicator.facultyIndicators.data}
                />
              </Box>
            ) : (
              <Box>
                {isManagement && (
                  <Box sx={{ mb: 3 }}>
                    <InputDataMajor indicatorID={indicator.indicatorID} />
                  </Box>
                )}
                {indicator.majorIndicators.data.map((item) => (
                  <Box key={item.majorID} sx={{ mb: 3 }}>
                    <Card>
                      <Stack
                        alignItems="center"
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ mt: 1, mb: 2 }}
                      >
                        <img
                          src={item.majorImage}
                          alt=""
                          style={{ width: '60px', objectFit: 'cover' }}
                        />
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ mx: 2 }}
                        />
                        <Header text={item.majorName} />
                      </Stack>
                      <Box
                        sx={{
                          backgroundColor: GREY[200],
                          p: 1,
                          borderRadius: 2,
                        }}
                      >
                        <DataYearTable
                          indicatorID={indicator.indicatorID}
                          setSelectedData={setSelectedData}
                          isLoading={isIndicatorLoading}
                          data={item.majorData}
                        />
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Box>
            ),
          ]}
        />
        <Box>
          <ProgressDialog
            data={currentData}
            indicatorName={indicator.indicatorName}
            indicatorCode={indicator.indicatorCode}
            open={openDetail}
            handleCloseDetail={handleCloseDetail}
          />
        </Box>
      </Container>
    </>
  );
};

export default IndicatorDetail;
