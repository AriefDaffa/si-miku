import { useMemo, useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';

import YearPicker from '@/components/UI/atoms/YearPicker/YearPicker';
import TextWithSubHeader from '@/components/UI/molecules/TextWithSubHeader';
import useChartStyle from '@/controller/hooks/use-chart-style';
import CustomChart from '@/components/UI/atoms/CustomChart';
import type { IndicatorListDataNormalized } from '@/repository/query/department/DepartmentQuery';

interface DepartmentGraphicProps {
  // currentDepartment: number;
  // selectedYear: string;
  // view: number;
  // department: IndicatorListDataNormalized[];
  // setView: Dispatch<SetStateAction<number>>;
  // setSelectedYear: Dispatch<SetStateAction<string>>;
  // setCurrentDepartment: Dispatch<SetStateAction<number>>;
}

const DepartmentGraphic: FC<DepartmentGraphicProps> = (props) => {
  const {
    // currentDepartment,
    // department,
    // setCurrentDepartment,
    // selectedYear,
    // setSelectedYear,
    // setView,
    // view,
  } = props;

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    markers: {
      size: 5,
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: 'Departemen',
        data: [
          {
            x: 'Teknik Informatika',
            y: 193,
          },
          {
            x: 'Sistem Informasi',
            y: 223,
          },
        ],
      },
    ];
  }, []);

  return (
    <Box>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 1, mb: 3 }}
      >
        <BarChartIcon fontSize="large" />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <TextWithSubHeader
          subHeader="Overview"
          header={`Perkembangan departemen`}
        />
      </Stack>
      <Card>
        <CustomChart
          chartOptions={chartOptions}
          series={series}
          type="bar"
          height={400}
        />
      </Card>
    </Box>
  );
};

export default DepartmentGraphic;
