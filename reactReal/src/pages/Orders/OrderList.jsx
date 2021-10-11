import { arrayOf, func, string } from 'prop-types';
import { orderType } from './types';
import { marketsTrading } from '../../shared.constants';
import OrdersTable from './OrdersTable';
import CurrencyCheckboxGroup from '../../components/CurrencyCheckBoxGroup';
function OrderList({ activeMarkets = marketsTrading, deleteAll, orders }) {

  const renderOrders = () => {
    return (
      <OrdersTable
        activeMarkets={activeMarkets}
        deleteAll={deleteAll}
        orders={orders}
      />
    );
  };

  const renderNoOrders = () => {
    return (
      <div className="body">
        <div className="filters no-orders">
          <table id="orders" className="trades">
            <caption>
              There are no open trade orders for this account based on current filters
            </caption>
            <thead>
              <tr>
                <th colSpan="10">
                  <div className="filters">
                    <CurrencyCheckboxGroup />
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <div className="txt_loading">No orders found</div>
        </div>
      </div>
    );
  };
  return (
    <section id="orders">
      {orders.length > 0 ? renderOrders() : renderNoOrders()}
    </section>
  );
}

OrderList.propTypes = {
  activeMarkets: arrayOf(string),
  deleteAll: func,
  orders: arrayOf(orderType)
};

export default OrderList;
