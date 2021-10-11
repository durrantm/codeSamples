import { string, number } from 'prop-types';

const shortOrderID = (str, numChars = 6) => {
  if (str.length <= numChars) return str;
  return str.slice(-numChars);
};

shortOrderID.propTypes = {
  str: string,
  numChars: number
};

export default shortOrderID;
