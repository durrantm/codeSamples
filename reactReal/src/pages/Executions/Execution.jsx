import { string } from 'prop-types';
import * as u from '../../util/format';
import { executionType } from './types';
import shortOrderID from '../../util/shortOrderID';

function Execution({ trade, striped }) {
  if (Object.keys(trade).length === 0) return <tr><td colSpan="4">-</td></tr>;
  if (isNaN(trade.amount)) return <tr><td colSpan="4">-</td></tr>;
  const calculateTotal = (trade) => {
    return parseFloat(Number(trade.amount) * Number(trade.price))
      + parseFloat(trade.commission)
      - parseFloat(trade.rebate);
  };
  const decimals = price => price < 100 ? 2 : 0;
  const market = trade.market.length > 0 ? trade.market.substring(0, 3) : '';
  const price = u.commaForThousands(parseFloat(trade.price).toFixed(decimals(trade.price)));
  return (
    <tr className={`row righty border-bottom ${striped}`}>
      <td>{u.formatTimeStamp(new Date(trade.executed_at))}</td>
      <td className="executions-order">{shortOrderID(trade.order_id)}</td>
      <td className={`${market}`} data-testid="market-type">{u.currency(trade.market)}&nbsp;</td>
      <td className={trade.side}>{trade.side}&nbsp;</td>
      <td>{u.withDecimals(trade.amount)}</td>
      <td className="asset-price">
        {price < 1000 &&
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </>
        }
        ${price}
      </td>
      <td>${parseFloat(trade.commission).toFixed(2)}&nbsp;&nbsp;</td>
      <td className="executions-rebate">${parseFloat(trade.rebate).toFixed(2)}</td>
      <td> ${u.commaForThousands(calculateTotal(trade).toFixed(2))}</td>
    </tr >
  );
}

Execution.propTypes = {
  trade: executionType,
  striped: string
};

export default Execution;
