export const PercentageCalculator = (count: number, total_count: number) => {
  if (!count || !total_count) {
    return 0;
  }

  let num = ((count * 100) / total_count).toString();

  const isNumDecimal = num.indexOf('.') !== -1 ? true : false;

  if (isNumDecimal) {
    num = num.slice(0, num.indexOf('.') + 2);
  }

  const percentage = Number(num);

  return percentage;
};
