import { useMemo } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomChart from '@/components/CustomChart';
import useChartStyle from '@/hooks/use-chart-style';
import CustomCard from '@/components/CustomCard';
import ProgressCard from '@/components/ProgressCard';
import Pill from '@/components/Pill';
import CustomGrid from '@/components/CustomGrid';
import { getPercentage } from '@/utils/get-percentage';
import { ERROR, LIGHT, PRIMARY, SUCCESS } from '@/theme/Colors';
import { Header, SubHeader } from '@/components/Typography';

import CountCard from './CountCard';
import { DialogFullValue } from '../constant';
import type { DialogFullVal } from '../types';

interface FullScreenDialogProps {
  openFullDialog: DialogFullVal;
  setOpenFullDialog: Dispatch<SetStateAction<DialogFullVal>>;
}

const FullScreenDialog: FC<FullScreenDialogProps> = (props) => {
  const { openFullDialog, setOpenFullDialog } = props;

  const { q1, q2, q3, q4, year, target, isTargetFulfilled } =
    openFullDialog.data;

  const percentage = getPercentage(q1 + q2 + q3 + q4, target);

  const chartOptions = useChartStyle({
    legend: { floating: false, horizontalAlign: 'center', position: 'bottom' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    // colors: [SUCCESS.dark, ERROR.dark],
    markers: {
      size: 5,
    },
  });

  const series = useMemo(() => {
    return [
      {
        name: openFullDialog.indicatorName,
        data: [
          {
            x: 'Q1',
            y: q1,
          },
          {
            x: 'Q2',
            y: q2,
          },
          {
            x: 'Q3',
            y: q3,
          },
          {
            x: 'Q4',
            y: q4,
          },
        ],
      },
    ];
  }, [openFullDialog]);

  const handleClose = () => {
    setOpenFullDialog(DialogFullValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'xl'}
      open={openFullDialog.state}
      onClose={handleClose}
    >
      {/* <DialogTitle>Perkembangan data indikator</DialogTitle> */}
      <DialogContent sx={{ backgroundColor: LIGHT.main }}>
        <Box>
          <SubHeader text="Indikator" />
          <Header text={openFullDialog.indicatorName} />
        </Box>
        <Box>
          <SubHeader text="Jurusan" />
          <Header
            text={`${openFullDialog.major.majorName} - ${year.yearValue}`}
          />
        </Box>
        <CustomCard sx={{ my: 1 }}>
          <div>
            <CustomChart
              chartOptions={chartOptions}
              series={series}
              type="bar"
              height={400}
            />
          </div>
        </CustomCard>
        <CustomGrid
          sm={[12, 12, 6, 6]}
          spacing={1}
          gridItem={[
            <CountCard
              Icon={JoinFullIcon}
              color={PRIMARY.main}
              title={`Jumlah total data pada tahun ${year.yearValue}`}
              value={`${q1 + q2 + q3 + q4}`}
            />,
            <CountCard
              Icon={TrackChangesIcon}
              color={PRIMARY.main}
              title={`Target yang perlu dicapai pada tahun ${year.yearValue}`}
              value={`${target}`}
            />,
            <ProgressCard
              headertext="progress indikator"
              value={percentage >= 100 ? 100 : percentage}
            />,
            <CustomCard>
              <SubHeader text="Status indikator" />
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    mb: 1,
                    backgroundColor:
                      isTargetFulfilled === false ? ERROR.main : SUCCESS.main,
                  }}
                >
                  {isTargetFulfilled === false ? (
                    <CancelIcon />
                  ) : (
                    <DoneAllIcon />
                  )}
                </Avatar>
                <Pill isError={isTargetFulfilled === false}>
                  <Header
                    variant="subtitle2"
                    text={`${
                      isTargetFulfilled === true ? 'Memenuhi' : 'Belum Memenuhi'
                    }`}
                  />
                </Pill>
              </Stack>
            </CustomCard>,
          ]}
        />
        <Box sx={{ float: 'right', my: 2 }}>
          <Button color="warning" variant="contained" sx={{ mr: 1 }}>
            Edit Data
          </Button>
          <Button color="error" variant="contained">
            Hapus Data
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenDialog;
