import { arrayOf } from 'prop-types';
import { orderType } from './types';
import total from '../../util/total';
import * as u from '../../util/format';

const orderTotal = ({ base_amount, price }) => parseFloat(base_amount) * parseFloat(price);
const buySellTotal = (orders, side) => {
  if (!orders) return 0;
  const result = total(orders, order => order.side === side ? orderTotal(order) : 0);
  return u.commaForThousands(String(result.toFixed(2)));
};
const Totals = ({ orders = [] }) => {
  return (
    <tr className="trade-totals">
      <td className="top-totals total">Total&nbsp;<span className="num-records"> {orders.length}</span></td>
      <td className="orders-order top-totals">&nbsp;</td>
      <td className="orders-order top-totals multi-order">&nbsp;</td>
      <td colSpan="7" className="total-buys-sells top-totals" data-testid="total-buy-sell">
        Buys <small>$</small>
        <span className="BUY">
          {buySellTotal(orders, 'BUY')}&nbsp;&nbsp;|&nbsp;&nbsp;
        </span>
            Sells <small>$</small>
        <span className="SELL">
          {buySellTotal(orders, 'SELL')}
        </span>
      </td>
    </tr>
  );
};

Totals.propTypes = {
  orders: arrayOf(orderType)
};

export default Totals;