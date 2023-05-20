// import { Link as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

// import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';

import AvatarTitle from '@/presentation/global-component/UI/AvatarTitle/AvatarTitle';
import TargetQuarterCard from '@/presentation/page-component/common/TargetQuarterCard';
import { LIGHT, PRIMARY } from '@/presentation/global-component/theme/Colors';
import type { TargetQuarterNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface DepartmentQuarterDialogProps {
  openDialog: boolean;
  imageURL: string;
  departmentName: string;
  currentYear: number;
  indicatorName: string;
  onClose: () => void;
  targetQuarter: TargetQuarterNormalized;
}

const DepartmentQuarterDialog: FC<DepartmentQuarterDialogProps> = (props) => {
  const {
    currentYear,
    imageURL,
    departmentName,
    onClose,
    openDialog,
    targetQuarter,
    indicatorName,
  } = props;

  return (
    <Dialog fullWidth maxWidth="xl" open={openDialog} onClose={onClose}>
      <Box sx={{ p: 3, backgroundColor: LIGHT.main }}>
        <AvatarTitle
          imageURL={imageURL}
          subHeader={`Data Departemen ${departmentName} tahun ${currentYear}`}
          header={`${indicatorName}`}
        />
        <Alert
          severity="info"
          variant="filled"
          sx={{ backgroundColor: PRIMARY.main, my: 2 }}
        >
          Data dibawah merupakan data indikator yang telah dibagi pada level
          Departemen.
          {/* Untuk melihat data indikator pada level Fakultas,
          silahkan klik{' '}
          <Link
            component={RouterLink}
            to={`/dashboard/indicator/${indicatorID}`}
            sx={{ color: 'white', textDecorationColor: 'white' }}
          >
            disini
          </Link> */}
        </Alert>
        <TargetQuarterCard targetQuarter={targetQuarter} />
      </Box>
    </Dialog>
  );
};

export default DepartmentQuarterDialog;
