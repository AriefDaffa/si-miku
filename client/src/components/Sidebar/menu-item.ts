import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export const NAV_ITEM = [
  {
    title: 'Overview',
    path: 'overview',
    Icon: HomeIcon,
  },
  {
    title: 'Indikator',
    path: 'indicator',
    Icon: ArticleIcon,
  },
  {
    title: 'List Indikator',
    path: 'indicator-list',
    Icon: BarChartIcon,
  },
  {
    title: 'List Target',
    path: 'target-list',
    Icon: TrackChangesIcon,
  },
  {
    title: 'Input Indikator',
    path: 'indicator-input',
    Icon: EditIcon,
  },
  {
    title: 'Input Target',
    path: 'target-input',
    Icon: TextFieldsIcon,
  },
];
