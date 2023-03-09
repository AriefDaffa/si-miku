import type { SelectChangeEvent } from '@mui/material/Select';

interface MenuItem {
  value: string;
  title: string;
}

export interface SubHeaderProps {
  text: string;
  withSelect?: boolean;
  selectValue?: string;
  onChange?: (event: SelectChangeEvent) => void;
  menuItem?: MenuItem[];
}
