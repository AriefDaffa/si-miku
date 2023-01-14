import type { Control } from 'react-hook-form';

interface Item {
  itemValue: string;
  itemTitle: string;
}

export interface SelectInputProps {
  name: string;
  label: string;
  defaultValue: any;
  menuItem: Item[];
  control: Control<any, any>;
}
