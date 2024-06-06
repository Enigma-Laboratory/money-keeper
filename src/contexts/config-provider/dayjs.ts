import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const dayjsInit = () => {
  dayjs.extend(utc);
};
