import moment from 'moment';
const showUnixTime = (date: number ) => {
  return  moment.unix(date).toLocaleString().substring(16, 21);
};

export default showUnixTime;