import { useCallback } from 'react';
import { func, bool, string } from 'prop-types';
import { orderType } from './types';
import MultiOrderCell from './MultiOrderCell';
import * as u from '../../util/format';
import shortOrderID from '../../util/shortOrderID';

function Order({ stripeClass, checked, deleteOne, inBatchMode = false, order, toggle }) {
  if (Object.keys(order).length === 0) return <tr><td colSpan="4">-</td></tr>;
  const sum = (order) => u.commaForThousands((Number(order.price) * Number(order.base_amount)).toFixed(2));
  const price = (order) => u.commaForThousands(parseFloat(order.price).toFixed(order.price < 100 ? 2 : 0));
  const deleteOrder = useCallback(() => deleteOne(order.id), [order]);
  const toggleOrder = useCallback(() => inBatchMode && toggle(order), [inBatchMode, order]);
  const orderNum = useCallback(() => shortOrderID(order.id || ''), [order]);
  const market = u.currency(order.market);
  const inBatchModeClass = inBatchMode ? 'batch-mode' : '';
  return (
    <tr className={`${stripeClass} row righty border-bottom ${inBatchModeClass}`} onClick={toggleOrder}>
      <td>{u.formatTimeStamp(new Date(order.created_at))}</td>
      <td className="orders-order">{orderNum(order.id)}&nbsp;</td>
      <MultiOrderCell metadata={order.metadata} />
      <td className={market}>{market}&nbsp;</td>
      <td className={order.side}>{order.side}&nbsp;</td>
      <td>{u.withDecimals(order.base_amount, 5)}</td>
      <td>{u.withDecimals(order.amount_filled || 0, 5)}</td>
      <td className="asset-price" data-testid="order-price">
        {price(order) < 1000 && <>&nbsp;</>}
        {price(order) < 100 && <>&nbsp;&nbsp;</>}
        ${price(order)}
      </td>
      <td data-testid="order-total"> ${sum(order)} </td>
      {inBatchMode ?
        <td className="delete-me">
          <input type="checkbox" checked={checked}
            data-testid="batch-checkbox"
            readOnly aria-label="remove this order"
          />
        </td>
        :
        <td className="delete-me"
          title="Delete order"
          onClick={deleteOrder}
          aria-label="remove this order"
        >
          <button className={`delete-me ${stripeClass}`}>X </button>
        </td>
      }
    </tr >
  );
}
Order.propTypes = {
  stripeClass: string,
  checked: bool,
  deleteOne: func,
  inBatchMode: bool,
  order: orderType,
  toggle: func
};

export default Order;
