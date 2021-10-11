import { string } from 'prop-types';

const commaForThousands = (num = '') => {
  const numLength = num.length;
  if (Number(num) < 1000) return num;
  if (Number(num) < 10000) return `${num.substring(0, 1)},${num.substring(1, numLength)}`;
  if (Number(num) < 100000) return `${num.substring(0, 2)},${num.substring(2, numLength)}`;
  if (Number(num) < 1000000) return `${num.substring(0, 3)},${num.substring(3, numLength)}`;
  return `${num.substring(0, 4)},${num.substring(4, 8)}`;
};

commaForThousands.propTypes = {
  num: string
};

export default commaForThousands;