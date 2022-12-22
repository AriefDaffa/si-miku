import BarChartIcon from '@mui/icons-material/BarChart';
import TableViewIcon from '@mui/icons-material/TableView';
import LogoutIcon from '@mui/icons-material/Logout';

export const NAV_ITEM = [
  {
    title: 'Dashboard',
    path: '/',
    Icon: BarChartIcon,
  },
  {
    title: 'List Indikator',
    path: '/indicator',
    Icon: TableViewIcon,
  },
];

export const LOGOUT_ITEM = {
  title: 'Logout',
  path: '/',
  Icon: LogoutIcon,
};
