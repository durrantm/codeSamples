import { arrayOf, bool, func, string } from 'prop-types';
import currency from '../../util/currency';
import { orderType } from './types';

const BatchButtons = ({
  batchMode,
  toggleBatchMode,
  selectAll,
  deselectAll,
  ordersInBatch,
  deleteChecked
}) => {
  const renderButtons = () => {
    if (!batchMode) {
      return <button className="batch-delete" onClick={toggleBatchMode}>Batch Delete</button>;
    }

    const itemCountsByCurrency = ordersInBatch.reduce((counter, item) => ({
      ...counter, [item.market]: (counter[item.market] || 0) + 1
    }), {});
    const numCheckedByCurr = Object.keys(itemCountsByCurrency)
      .map(market => `${currency(market)}: ${itemCountsByCurrency[market]}`)
      .join(', ');
    let selectButton = <button onClick={deselectAll} className="bulk-select-btn">Unselect all</button>;
    const numChecked = ordersInBatch.length;
    const orderOrOrders = numChecked === 1 ? 'order' : 'orders';
    if (numChecked === 0) {
      selectButton = <button onClick={selectAll} className="bulk-select-btn">Select all</button>;
    }

    return (
      <>
        <button data-testid="delete-batch-button"
          onClick={deleteChecked} className="danger" disabled={numChecked === 0}
        >
          Delete {numChecked} {orderOrOrders} {numChecked > 0 ? `(${numCheckedByCurr})` : ''}
        </button>
        {selectButton}
        <button data-testid="delete-batch-button" onClick={toggleBatchMode} className="cancel">Cancel</button>
      </>
    );
  };

  return (
    <div className="order-btn-group">
      {renderButtons()}
    </div>
  );
};

BatchButtons.propTypes = {
  activeMarkets: arrayOf(string),
  batchMode: bool,
  toggleBatchMode: func,
  selectAll: func,
  deselectAll: func,
  ordersInBatch: arrayOf(orderType),
  deleteChecked: func
};

export default BatchButtons;