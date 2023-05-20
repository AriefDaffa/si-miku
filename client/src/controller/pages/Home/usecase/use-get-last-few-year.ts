import moment from 'moment';

export const useGetLastFewYear = (count: number, asc?: boolean) => {
  const curYear = moment().year();

  const finalYear = [];

  for (let i = 0; i < count; i++) {
    finalYear.push(`${curYear - i}`);
  }

  if (asc) {
    finalYear.reverse();
  }

  return finalYear.join(',');
};
