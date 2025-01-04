import { languages } from '../constants/languages';
import moment from 'moment';
import 'moment/dist/locale/es';

const currentLanguage = localStorage.getItem('currentLanguage');
moment.locale(currentLanguage);

export const getCalendarDate = (firstDay) => {
  const { SPANISH } = languages;
  const today = currentLanguage === SPANISH ? 'HOY' : 'TDY';
  const day = firstDay ? today : moment.format('ddd').toUpperCase();
  const date = moment.format('D');
  const month = moment.format('MMMM').toUpperCase();
  return { day, date, month };
};

export const getLiteralDate = (date) => {
  return moment(date).format('LLLL').capitalize();
};
