import { useCallback, useEffect } from 'react';
import { arrayOf, func, string } from 'prop-types';
import Order from './Order';
import { orderType } from './types';
import useBatchTradeDelete from '../../hooks/useBatchTradeDelete';
import BatchButtons from './BatchButtons';
import Totals from './Totals';
import LimitButtonsRow from '../../components/LimitButtonsRow';
import CurrencyCheckBoxGroup from '../../components/CurrencyCheckBoxGroup';
const OrdersTable = ({ activeMarkets, deleteAll, orders }) => {
  const {
    batchMode,
    deselectAll,
    ordersInBatch,
    selectAll,
    setOrdersInBatch,
    toggleBatchMode,
    toggleOrderInBatch
  } = useBatchTradeDelete();
  const deleteOne = useCallback(orderId => deleteAll(new Set([orderId])), []);
  const deleteAllChecked = useCallback(async () => {
    const allIds = ordersInBatch.map(item => item.id);
    const success = await deleteAll(new Set(allIds));
    if (success) toggleBatchMode();
  }, [ordersInBatch]);
  const selectAllOrders = useCallback(() => selectAll(orders), [orders]);
  const isChecked = useCallback(item => Boolean(ordersInBatch.find(order => order.id === item.id)),
    [ordersInBatch]
  );

  useEffect(() => {
    setOrdersInBatch(oldItems =>
      oldItems.filter(item => activeMarkets.includes(item.market))
    );
  }, [orders]);

  let stripeColor = '';
  let lastOrderID = '';
  let lastSide = '';

  return (
    <>
      <div className="body">
        <table id="orders" className="trades">
          <caption>
            Current open trade orders for this account filtered by Currency
          </caption>
          <thead>
            <tr>
              <th colSpan="10">
                <div className="filters">
                  <CurrencyCheckBoxGroup />
                </div>
                <BatchButtons
                  batchMode={batchMode}
                  toggleBatchMode={toggleBatchMode}
                  selectAll={selectAllOrders}
                  deselectAll={deselectAll}
                  ordersInBatch={ordersInBatch}
                  deleteChecked={deleteAllChecked}
                />
              </th>
            </tr>
            <LimitButtonsRow />
            <Totals orders={orders} />
            <tr className="righty bg-black">
              <th>
                <span className="reload">
                  <a href="/orders" >
                    <img className="reload-image" src="reload.png" />
                  </a>
                </span>
                &nbsp;&nbsp;&nbsp;Date&nbsp;&#8595;
              </th>
              <th className="orders-order">Order</th>
              <th className="orders-order multi-order">MultiOrder</th>
              <th>Mkt</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Filled</th>
              <th>Price</th>
              <th>Total</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const sameOrderSameSide =
                order.metadata?.multi_order_id === lastOrderID &&
                order.side === lastSide &&
                lastOrderID !== '';
              if (!sameOrderSameSide) {
                stripeColor = stripeColor === 'dark-row' ? 'light-row' : 'dark-row';
              }
              lastOrderID = order.metadata?.multi_order_id ?? '';
              lastSide = order.side;
              return (
                <Order
                  order={order}
                  key={order.id}
                  stripeClass={stripeColor}
                  inBatchMode={batchMode}
                  toggle={toggleOrderInBatch}
                  deleteOne={deleteOne}
                  checked={isChecked(order)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

OrdersTable.propTypes = {
  activeMarkets: arrayOf(string),
  orders: arrayOf(orderType),
  deleteAll: func
};

export default OrdersTable;