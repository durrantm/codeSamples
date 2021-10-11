import { exact, oneOf, string, objectOf, oneOfType, shape } from 'prop-types';

const tradeType = exact({
  base_amount: string,
  ref_id: string,
  price: string,
  side: oneOf(['BUY', 'SELL'])
});

const errorsType = objectOf(
  oneOfType([
    string,
    shape({
      base_amount: string,
      price: string
    })
  ])
);

export { tradeType, errorsType };
