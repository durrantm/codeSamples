import daysOfTheWeek from '../formatDateTime/daysOfTheWeek';

const showDayNameDaily = (date: string) => {
  const dayOFWeek: number = new Date(Date.parse(date)).getDay();
  const whichDay: number = daysOfTheWeek[(dayOFWeek + 1) % 7];
  return whichDay;
};

export default showDayNameDaily;