import { useCallback } from 'react';
import { number, shape, string } from 'prop-types';
import { tradeType } from './types';
import commaForThousands from '../../util/commaForThousands';
import { priceLimits } from '../../shared.constants';
import useTrades from '../../hooks/useTrades';
import currencyFormat from '../../util/currency';

function TradingTableRow({
  error,
  index,
  marketPrice,
  trade,
}) {
  const { removeRowsByUUID, editTrade, setTradeError, currency } = useTrades();
  const market = currencyFormat(currency);
  const removeByUUID = useCallback(() => removeRowsByUUID({
    uuids: new Set([trade.ref_id]),
    side: trade.side
  }), [trade]);
  const updateRow = useCallback(e => {
    const { name, value } = e.target;
    const { ref_id, side } = trade;
    editTrade({ ref_id, side, idx: index - 1, name, value });
  }, [trade.ref_id, trade.side, index]);

  const checkForErrors = useCallback(() => {
    setTradeError({ trade, bounds: priceLimits[market], currentPrice: marketPrice });
  }, [trade, market, marketPrice]);

  const diff = marketPrice - Number(trade.price);
  const sign = diff >= 0 ? '-' : '+';
  const totalTradeValue = Number(trade.base_amount) * Number(trade.price);
  return (
    <tr className="row righty" data-testid="trading-table-row">
      <td className={`${market} label`} >{index}</td>
      <td>
        <input
          autoComplete="off"
          className={error?.base_amount ? 'error' : ''}
          data-testid="base_amount"
          name="base_amount"
          onChange={updateRow}
          onBlur={checkForErrors}
          type="text"
          value={trade.base_amount}
          title="Quantity"
        />
      </td>
      <td>
        <input
          autoComplete="off"
          className={error?.price ? 'error' : ''}
          data-testid="price"
          name="price"
          onChange={updateRow}
          onBlur={checkForErrors}
          type="text"
          value={trade.price}
          title="Price"
        />
      </td>
      <td title="order price - current market price">{diff && marketPrice && trade.price && !error?.price ?
        sign + commaForThousands(Math.abs(diff).toFixed(2)) : ''}
      </td>
      <td title="order amount">
        {totalTradeValue && !error?.price && !error?.base_amount ?
          `$${commaForThousands(totalTradeValue.toFixed(2))}`
          :
          ''
        }
      </td>
      <td className="label delete-me"
        onClick={removeByUUID} aria-label="remove order"
      >
        <button onClick={removeByUUID} className="label delete-me row" >X</button>
      </td>
    </tr>
  );
}

TradingTableRow.propTypes = {
  error: shape({
    base_amount: string,
    price: string
  }),
  index: number,
  marketPrice: number,
  trade: tradeType,
};

export default TradingTableRow;
