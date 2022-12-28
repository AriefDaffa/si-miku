import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export const NAV_ITEM = [
  {
    title: 'Overview',
    path: 'overview',
    Icon: HomeIcon,
  },
  {
    title: 'List Indikator',
    path: 'indicator-list',
    Icon: BarChartIcon,
  },
  {
    title: 'List Target Indikator',
    path: 'target-list',
    Icon: TrackChangesIcon,
  },
];

export const LOGOUT_ITEM = {
  title: 'Logout',
  path: '/',
  Icon: LogoutIcon,
};
