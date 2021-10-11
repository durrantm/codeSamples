import { useState, useCallback } from 'react';

function useBatchTradeDelete() {
  const [batchMode, setBatchMode] = useState(false);
  const [ordersInBatch, setOrdersInBatch] = useState([]);
  const deselectAll = useCallback(() => setOrdersInBatch([]), []);
  const selectAll = useCallback(items => {
    if (!(items instanceof Array)) throw new TypeError(
      `selectAll expected a Array, got: ${items.constructor.name}`
    );
    setOrdersInBatch(items);
  }, []);
  const toggleBatchMode = useCallback(() => {
    setBatchMode(mode => {
      if (mode) deselectAll();
      return !mode;
    });
  }, [deselectAll]);
  const toggleOrderInBatch = useCallback(newOrder => {
    setOrdersInBatch(oldOrders => {
      const ordersCopy = [...oldOrders];
      const orderIdx = ordersCopy.findIndex(order => order.id === newOrder.id);
      if (orderIdx > -1) ordersCopy.splice(orderIdx, 1);
      else ordersCopy.push(newOrder);
      return ordersCopy;
    });
  }, []);
  return {
    batchMode, ordersInBatch, selectAll, deselectAll,
    toggleBatchMode, toggleOrderInBatch, setOrdersInBatch
  };
}

export default useBatchTradeDelete;
