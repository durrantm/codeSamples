import { string, number } from 'prop-types';
import commaForThousands from './commaForThousands';
import formatNumber from '../util/formatNumber';

const dollars = (amount = 0, decimals = 2) => {
  const result = commaForThousands(formatNumber(amount, decimals));
  const resultLength = result.length;
  if (result.substring(resultLength - 3) === '.00') {
    return `$${result.substring(0, resultLength - 3)}`;
  }
  return `$${result}`;
};

dollars.propTypes = {
  quantity: string,
  decimals: number
};

export default dollars;


