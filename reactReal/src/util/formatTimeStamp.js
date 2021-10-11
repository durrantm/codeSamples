import { string } from 'prop-types';

import dayjs from 'dayjs';

const formatTimeStamp = (date = '') => {
  return date ? dayjs(date).format('MM-DD HH:mm'): '';
};

formatTimeStamp.propTypes = {
  date: string
};

export default formatTimeStamp;
