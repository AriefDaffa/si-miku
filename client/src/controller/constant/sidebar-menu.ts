import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';

export const NAV_ITEM = [
  {
    title: 'Home',
    path: 'home',
    Icon: HomeIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'List Indikator',
    path: 'indicator',
    Icon: FormatListBulletedIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'Data Fakultas',
    path: 'faculty',
    Icon: BusinessIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'Data Departemen',
    path: 'department',
    Icon: AccountBalanceIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'Data Program Studi',
    path: 'major',
    Icon: SchoolIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'Tambah Indikator',
    path: 'indicator-input',
    Icon: AddIcon,
    accessRole: '2,3',
  },
];

export const NAV_ITEM_SECONDARY = [
  {
    title: 'Profile',
    path: 'profile',
    Icon: AccountCircleIcon,
    accessRole: '1,2,3',
  },
  {
    title: 'User',
    path: 'user',
    Icon: PeopleIcon,
    accessRole: '3',
  },
];
