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
    title: 'List Indikator',
    path: 'indicator',
    Icon: FormatListBulletedIcon,
    isManagementOnly: false,
  },
  {
    title: 'Data Fakultas',
    path: 'faculty',
    Icon: BusinessIcon,
    isManagementOnly: false,
  },
  {
    title: 'Data Departemen',
    path: 'department',
    Icon: AccountBalanceIcon,
    isManagementOnly: false,
  },
  {
    title: 'Data Program Studi',
    path: 'major',
    Icon: SchoolIcon,
    isManagementOnly: false,
  },
  // {
  //   title: 'Edit Indikator',
  //   path: 'indicator-edit',
  //   Icon: EditIcon,
  //   isManagementOnly: true,
  // },
  {
    title: 'Tambah Indikator',
    path: 'indicator-input',
    Icon: AddIcon,
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
