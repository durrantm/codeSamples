import { exact, shape, string } from 'prop-types';

const orderType = exact({
  amount_filled: string,
  base_amount: string,
  created_at: string,
  id: string,
  market: string,
  metadata: shape({
    multi_order_id: string,
    multi_order_name: string
  }),
  modified_at: string,
  price: string,
  profile_id: string,
  ref_id: string,
  quote_amount: string,
  side: string,
  status: string,
  type: string,
  volume_weighted_average_price: string,
  time_in_force: string,
  expiration_date: string
});

export { orderType };