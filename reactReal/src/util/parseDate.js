import dayjs from 'dayjs';

const parseDate = (dt) => {
  const result = dayjs(dt).format('MM/DD/YY');
  return result;
};

parseDate.propTypes = {
  dt: Date
};
export default parseDate;
