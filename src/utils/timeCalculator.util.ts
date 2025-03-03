import dayjs from 'dayjs';

export const TimeCalculator = (time: Date | undefined) => {
  const current_time = dayjs();
  const due_time = dayjs(time);

  const diff_in_days = due_time.diff(current_time, 'days');
  const diff_in_hours = due_time.diff(current_time, 'hours');
  const diff_in_minutes = due_time.diff(current_time, 'minutes');

  if (diff_in_days > 0) {
    return {difference: `${diff_in_days} დღე`};
  }

  if (diff_in_hours > 0) {
    return {difference: `${diff_in_hours} საათი`};
  }

  if (diff_in_minutes > 0) {
    return {difference: `${diff_in_minutes} წუთი`};
  }

  return {difference: null};
};
