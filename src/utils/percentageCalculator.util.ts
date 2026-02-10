export const PercentageCalculator = (count: number, total_count: number) => {
  if (count === 0 || total_count === 0) {
    return 0;
  }

  const percentage = (count * 100) / total_count;
  const isDecimal = percentage % 1 !== 0;

  if (isDecimal) {
    return Number(percentage.toFixed(1));
  }

  return percentage;
};
