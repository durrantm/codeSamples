import { string, number } from 'prop-types';

const withDecimals = (quantity, decimals = 6) => {
  if (!quantity) return '0.0000';
  return Number(quantity).toFixed(decimals);
};

withDecimals.propTypes = {
  quantity: string,
  decimals: number
};

export default withDecimals;