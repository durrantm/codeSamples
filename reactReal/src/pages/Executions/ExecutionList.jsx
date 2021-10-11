import { useMemo } from 'react';
import { arrayOf } from 'prop-types';
import Execution from './Execution';
import commaForThousands from '../../util/commaForThousands';
import withDecimals from '../../util/withDecimals';
import total from '../../util/total';
import { executionType } from './types';
import CurrencyCheckboxGroup from '../../components/CurrencyCheckBoxGroup';
import BuySellCheckboxGroup from '../../components/BuySellCheckboxGroup';
import LimitButtonsRow from '../../components/LimitButtonsRow';

const Divider = () => <span className="vertical-divider">&nbsp;|&nbsp;</span>;

const Totals = ({ trades = [] }) => {
  const pf = parseFloat;
  const buySellTotal = (trade, side) => {
    const factor = trade.side === side ? 1 : 0;
    return factor * pf(trade.amount) * pf(trade.price) + pf(trade.commission) - pf(trade.rebate) * factor;
  };
  const totalFees = trades => useMemo(() => total(trades, trade => pf(trade.commission)), [trades]);
  const tradesTotals = (trades, side) => {
    return useMemo(() => {
      return total(trades, trade => buySellTotal(trade, side), [trades]);
    });
  };
  const grandTotalFees = withDecimals(totalFees(trades), 2);
  const grandTotalBuys = commaForThousands(tradesTotals(trades.filter(trade => {
    return trade.side === 'BUY';
  }), 'BUY').toFixed(2));
  const grandTotalSells = commaForThousands(tradesTotals(trades.filter(trade => {
    return trade.side === 'SELL';
  }), 'SELL').toFixed(2));
  return (
    <tr className="trade-totals" >
      <td className="top-totals total">Total&nbsp;
        {trades.length < 100 && <>&nbsp;&nbsp;</>}
        {trades.length < 10 && <>&nbsp;&nbsp;</>}
        <span className="num-records" data-testid="num-records">&nbsp;{trades.length}</span>
      </td>
      <td className="executions-order">&nbsp;</td>
      <td colSpan="7" className="total-buys-sells top-totals">
        <span data-testid="total-buys">Buy&nbsp;
          <small>$</small><span className="BUY">{grandTotalBuys}</span>
        </span>
        <span data-testid="total-sells"><Divider />Sell&nbsp;
          <small>$</small><span className="SELL">{grandTotalSells}</span>
        </span>
        <span data-testid="total-fees">
          <Divider />Fees <small>$</small>
          <span className="total-fees">{grandTotalFees}</span>
          &nbsp;<span className="narrow-only">&nbsp;</span>
        </span>
      </td>
    </tr >
  );
};

Totals.propTypes = {
  trades: arrayOf(Object)
};

function ExecutionList({ trades }) {
  if (!trades?.length) {
    return (
      <section id="executions">
        <div className="body no-executions">
          <table id="executions" className="trades">
            <thead>
              <tr>
                <th colSpan="10">
                  <BuySellCheckboxGroup />
                  <CurrencyCheckboxGroup />
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="txt_loading">No executions found</div>
      </section>
    );
  }

  let striped = true;
  let last_order_id = '';
  return (
    <section id="executions">
      <div className="body">
        <table id="executions" className="trades">
          <caption>
            Trade executions for this account
          </caption>
          <thead>
            <tr>
              <th colSpan="10">
                <div className="filters">
                  <BuySellCheckboxGroup />
                  <CurrencyCheckboxGroup />
                </div>
              </th>
            </tr>
            <LimitButtonsRow />
            <Totals trades={trades} />
            <tr className="righty bg-black">
              <th>
                <a href="/executions" >
                  <img src="reload.png" className="reload-image" />
                </a>
                &nbsp;&nbsp;&nbsp;Date&nbsp;&#8595;
              </th>
              <th className="executions-order">Order</th>
              <th>Mkt</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Fee&nbsp;</th>
              <th className="executions-rebate">Rebate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => {
              if (last_order_id === trade.order_id) {
                striped = striped === 'dark-row' ? 'dark-row' : 'light-row';
              } else {
                striped = striped === 'dark-row' ? 'light-row' : 'dark-row';
              }
              last_order_id = trade.order_id;
              return (
                <Execution
                  trade={trade}
                  key={trade.execution_id}
                  striped={striped}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

ExecutionList.propTypes = {
  trades: arrayOf(executionType)
};

export default ExecutionList;
