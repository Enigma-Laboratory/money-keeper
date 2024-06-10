import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

export const dayjsInit = () => {
  dayjs.extend(utc);
  dayjs.extend(LocalizedFormat);
};