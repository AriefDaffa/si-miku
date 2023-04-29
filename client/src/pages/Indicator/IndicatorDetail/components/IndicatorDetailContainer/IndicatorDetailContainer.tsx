import { Fragment } from 'react';
import type { FC, ReactNode, Dispatch, SetStateAction } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Helmet from '@/components/UI/atoms/Helmet';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import YearPicker from '@/components/UI/atoms/YearPicker';

interface IndicatorDetailContainerProps {
  indicatorName: string;
  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}

const IndicatorDetailContainer: FC<IndicatorDetailContainerProps> = (props) => {
  const { indicatorName, children, selectedYear, setSelectedYear } = props;
  return (
    <Fragment>
      <Helmet title={`${indicatorName} | SI-MIKU`} />
      <Stack
        direction={{ sm: 'row' }}
        alignItems="center"
        sx={{ my: 1, mb: 3 }}
      >
        <Stack flexDirection="column" sx={{ width: '100%' }}>
          <Header text={indicatorName} variant="h3" />
          <SubHeader
            text={`Menampilkan detail data pada tahun ${selectedYear}`}
          />
        </Stack>
        <YearPicker
          label="Pilih tahun"
          yearValue={selectedYear}
          setYearValue={setSelectedYear}
        />
      </Stack>
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default IndicatorDetailContainer;
