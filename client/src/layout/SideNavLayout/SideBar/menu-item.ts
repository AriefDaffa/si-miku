import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const NAV_ITEM = [
  {
    title: 'Overview',
    path: 'overview',
    Icon: HomeIcon,
  },
  {
    title: 'List Indikator',
    path: 'indicator-list',
    Icon: ArticleIcon,
  },
  {
    title: 'Jurusan',
    path: 'jurusan',
    Icon: SchoolIcon,
  },
  {
    title: 'Indikator per-Tahun',
    path: 'indicator',
    Icon: BarChartIcon,
  },
  {
    title: 'Input Indikator',
    path: 'indicator-input',
    Icon: EditIcon,
  },
  {
    title: 'Profile',
    path: 'profile',
    Icon: AccountCircleIcon,
  },
];
