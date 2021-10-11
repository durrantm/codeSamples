import { exact, string } from 'prop-types';

const executionType = exact({
  execution_id: string,
  order_id: string,
  market: string,
  side: string,
  amount: string,
  price: string,
  commission: string,
  commission_asset: string,
  rebate: string,
  rebate_asset: string,
  executed_at: string
});

export { executionType };
