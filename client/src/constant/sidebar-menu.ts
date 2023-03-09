import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const NAV_ITEM = [
  {
    title: 'Overview',
    path: 'overview',
    Icon: HomeIcon,
  },
  {
    title: 'List Indikator',
    path: 'indicator',
    Icon: BarChartIcon,
  },
  {
    title: 'Fakultas',
    path: 'fakultas',
    Icon: AccountBalanceIcon,
  },
  {
    title: 'Departemen',
    path: 'jurusan',
    Icon: SchoolIcon,
  },
  {
    title: 'Input Indikator',
    path: 'indicator-input',
    Icon: EditIcon,
  },
  // {
  //   title: 'Profile',
  //   path: 'profile',
  //   Icon: AccountCircleIcon,
  // },
];
