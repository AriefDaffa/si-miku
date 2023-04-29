import { toInteger } from 'lodash';

export const getPercentage = (val: number, totalVal: number) => {
  return toInteger((100 * val) / totalVal) || 0;
};
