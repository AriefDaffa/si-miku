import { ERROR, SUCCESS, WARNING } from '@/theme/Colors';

export const getProgressColor = (value: number) => {
  if (value >= 70) {
    return SUCCESS.dark;
  } else if (value >= 40 && value < 70) {
    return WARNING.light;
  } else {
    return ERROR.dark;
  }
};
