const showDayNameHourly = (datetime: string = '') => {
  const inputPattern: any = /(\d{4})-(\d{2})-(\d{2}).(\d{1,2})/;
  if(datetime==='') return '';
  const args = inputPattern.exec(datetime).slice(1);
  const [yyyy, mm, dd, hh] = args.map((s: string) => parseInt(s, 10));
  const date = new Date(Date.UTC(yyyy, mm - 1, dd, hh));
  const options = { weekday: 'short', hour: 'numeric' };
  return date.toLocaleString('en-US', options).replace(/, (.{1,2}) (..)$/, ' $1$2');
};

export default showDayNameHourly;