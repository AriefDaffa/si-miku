import {
  ERROR,
  SUCCESS,
  WARNING,
} from '@/presentation/global-component/theme/Colors';

export const getProgressColor = (value: number) => {
  if (value >= 100) {
    return SUCCESS.dark;
  } else if (value >= 40 && value < 100) {
    return WARNING.light;
  } else {
    return ERROR.dark;
  }
};
