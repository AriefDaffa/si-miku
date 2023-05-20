import { Theme } from '@mui/system';

import Card from './Card';

const ComponentsOverrides = (theme: Theme) => {
  return Object.assign(Card(theme));
};

export default ComponentsOverrides;
