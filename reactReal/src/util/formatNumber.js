import { string, number } from 'prop-types';

const formatNumber = (quantity, decimals = 4) => {
  if (isNaN(Number(quantity))) return '';
  return Number(quantity).toFixed(decimals);
};

formatNumber.propTypes = {
  quantity: string,
  decimals: number
};

export default formatNumber;