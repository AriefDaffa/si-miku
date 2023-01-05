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
    title: 'Detail Indikator',
    path: 'indicator',
    Icon: ArticleIcon,
  },
  {
    title: 'Indikator per-Tahun',
    path: 'indicator-list',
    Icon: BarChartIcon,
  },
  {
    title: 'Indikator per-Jurusan',
    path: 'target-list',
    Icon: SchoolIcon,
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
