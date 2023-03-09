import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import TableCard from '@/components/UI/molecules/TableCard';
import ChartCard from '@/components/UI/molecules/ChartCard';
import Card from '@/components/UI/atoms/Card';
import { Header } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';
import type { IndicatorByIdDataNormalized } from '@/repository/query/IndicatorByIdQuery';

interface MajorSectionProps {
  isLoading: boolean;
  data: IndicatorByIdDataNormalized;
}

const MajorSection: FC<MajorSectionProps> = (props) => {
  const { data, isLoading } = props;

  return (
    <Box>
      {data.majorIndicators.data.map((item) => (
        <Card key={item.majorID} sx={{ mt: 2 }}>
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
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Header text={item.majorName} />
          </Stack>
          <Box sx={{ backgroundColor: GREY[200], p: 1, borderRadius: 2 }}>
            <TableCard
              indicatorCode={data.indicatorCode}
              indicatorID={data.indicatorID}
              indicatorName={data.indicatorName}
              isLoading={isLoading}
              data={item.majorData}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default MajorSection;
