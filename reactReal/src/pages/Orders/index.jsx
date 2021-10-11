import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { cryptoTraderAPI } from '../../services/config';
import useAPIError from '../../hooks/useAPIError';
import usePageSettings from '../../hooks/usePageSettings';
import OrderList from './OrderList';
import Loading from '../../components/Loading';

function Orders() {
  const [orders, setOrders] = useState([]);
  const removeOrders = useCallback(setOfIdsToRemove => {
    setOrders(oldOrders => oldOrders.filter(o => !setOfIdsToRemove.has(o.id)));
  }, []);
  const { activeMarkets, toggleMarket, limit } = usePageSettings();
  const [isLoading, setIsLoading] = useState(false);
  const { errors:apiErrors, addError, removeError } = useAPIError();
  const [showOrdersUI, setShowOrdersUI] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currency = location.state?.currency;
    if (currency && !activeMarkets.includes(currency)) {
      toggleMarket(currency);
    }
  }, []);

  useEffect(() => {
    const orders = async () => {
      if (activeMarkets.length === 0) {
        setOrders([]);
        return;
      }
      try {
        setIsLoading(true);
        const ordersDetails = await cryptoTraderAPI.orders(activeMarkets, limit);
        setOrders(ordersDetails.data.items);
        removeError(ordersDetails.config.url);
      } catch (err) {
        addError(err);
      }
      setIsLoading(false);
    };
    orders();
  }, [activeMarkets, limit]);

  const deleteAll = useCallback(async (orderIdSet) => {
    const numToDelete = orderIdSet.size;
    const orderOrOrders = numToDelete === 1 ? 'order' : 'orders';
    if (window.confirm(`Are you sure you want to cancel ${numToDelete} ${orderOrOrders}?`)) {
      try {
        const deletedDetails = await cryptoTraderAPI.delete_orders(orderIdSet);
        removeOrders(new Set(deletedDetails.data.orderIds));
        removeError(deletedDetails.config.url);
        return true;
      } catch (err) {
        removeOrders(new Set(err.response.data.error?.data?.orderIds || []));
        addError(err);
      }
    }
    return false;
  }, []);

  useEffect(() => {
    const errorKnownCode = Object.keys(apiErrors).filter((item) => {
      return item.includes('token') || item.includes('wallet_balance')
      && (apiErrors[item].status === 401 || apiErrors[item].status === 500 || apiErrors[item].status === 503);
    });
    errorKnownCode.length ? setShowOrdersUI(false) : setShowOrdersUI(true);
  }, [apiErrors]);

  if (!showOrdersUI) return (
    <div className="txt_loading">
      You need to be authenticated to use this page
    </div>
  );

  const loadingText = () => {
    return (
      <div className="txt_loading">
        <Loading />
        <p>Please wait while we fetch your order details</p>
      </div>
    );
  };

  return (
    <div data-testid="orders">
      <OrderList orders={orders} deleteAll={deleteAll} activeMarkets={activeMarkets} />
      {isLoading && orders.length === 0 && loadingText()}
    </div>
  );
}

export default Orders;
