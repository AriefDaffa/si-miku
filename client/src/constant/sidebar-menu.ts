import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';

export const NAV_ITEM = [
  {
    title: 'Overview',
    path: 'overview',
    Icon: HomeIcon,
    isManagementOnly: false,
  },
  {
    title: 'List Indikator',
    path: 'indicator',
    Icon: BarChartIcon,
    isManagementOnly: false,
  },
  {
    title: 'Fakultas',
    path: 'fakultas',
    Icon: AccountBalanceIcon,
    isManagementOnly: false,
  },
  {
    title: 'Jurusan',
    path: 'jurusan',
    Icon: SchoolIcon,
    isManagementOnly: false,
  },
  {
    title: 'Tambah Indikator',
    path: 'indicator-input',
    Icon: EditIcon,
    isManagementOnly: true,
  },
];

export const NAV_ITEM_SECONDARY = [
  {
    title: 'Profile',
    path: 'profile',
    Icon: AccountCircleIcon,
    isManagementOnly: false,
  },
  {
    title: 'User',
    path: 'user',
    Icon: PeopleIcon,
    isManagementOnly: true,
  },
];
