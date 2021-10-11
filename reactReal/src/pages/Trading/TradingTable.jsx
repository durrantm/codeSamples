import { useState, useMemo, useCallback, useEffect } from 'react';
import { string, arrayOf, func, number } from 'prop-types';
import { tradeType, errorsType } from './types';
import useWalletAndPrices from '../../hooks/useWalletAndPrices';
import total from '../../util/total';
import formatNumber from '../../util/formatNumber';
import commasForThousands from '../../util/commaForThousands';
import currencyFormat from '../../util/currency';
import ErrorArea from './ErrorArea';
import useTrades from '../../hooks/useTrades';
import TradingTableRow from './TradingTableRow';
function TradingTable({ addRow, marketPrice, errors = {}, maxRows = 50, removeRow, title, trades }) {
  const [showHide, setShowHide] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { setTotalError, currency } = useTrades();
  const market = currencyFormat(currency);
  const small = 1;
  const large = 5;
  const totalQty = useMemo(() => total(trades, t => Number(t.base_amount) || 0), [trades]);
  const totalPrice = useMemo(() => total(trades, t => Number(t.base_amount) * Number(t.price) || 0), [trades]);
  const asset = useMemo(() => title === 'Buy' ? 'USD' : market, [title, market]);
  const inDollars = useMemo(() => asset === 'USD', [asset]);
  const { wallet } = useWalletAndPrices();
  const item = useMemo(() => wallet?.items.find(item => item.asset === asset), [asset, wallet]);
  const formatAmt = useCallback(val => {
    if (!val && val !== 0) return '--';
    let prefix = '';
    if (val < 0) prefix = '-';
    if (inDollars) prefix = `${prefix}$`;
    const numAfterDecimal = inDollars ? 2 : 6;
    return `${prefix}${commasForThousands(formatNumber(Math.abs(val), numAfterDecimal))}`;
  }, [inDollars]);
  const pendingAmt = inDollars ? totalPrice : totalQty;

  const handleToggle = () => {
    setShowHide(hide => !hide);
    if (showTable) {
      setTimeout(() => {
        setShowTable(false);
      }, 1000);
    }
    else {
      setShowTable(true);
    }
  };

  useEffect(() => {
    if (item?.available) {
      setTotalError({
        available: Number(item.available),
        total: pendingAmt,
        inDollars
      });
    }
  }, [item, pendingAmt, inDollars]);

  const _title = title?.toUpperCase();
  const showHideText = showHide ? 'hide' : 'show';
  const display = showTable ? '' : 'none';

  return (
    <div className={`${_title} trading-area`} >
      <div id={`${_title}`} onClick={handleToggle} >
        <div className="trading-collapsible-title" >
          <button className={`${_title} trading-title`}
            aria-label={`Click to ${showHideText} ${title} details`}
          >
            {title}&nbsp;&nbsp;
            {!showHide ?
              <span className="trading-toggle-plus-icon">+</span>
              :
              <span className="trading-toggle-minus-icon">-</span>
            }
          </button>
        </div>
      </div>
      <section
        className={`table-container ${showHide ? 'active' : ''}`}
      >
        <table className="trading-wallet">
          <tbody>
            <tr className="righty">
              <td>
                <h2 className={`${market} label`}>Balance </h2>
              </td>
              <td>
                <h2 className={market}>{formatAmt(Number(item?.available) + Number(item?.trading))}</h2>
              </td>
            </tr>
            <tr className="righty">
              <td>
                <h2 className={`${market} label`}>Available </h2>
              </td>
              <td>
                <h2 className={market}>{formatAmt(Number(item?.available))}</h2>
              </td>
            </tr>
            <tr className="righty">
              <td>
                <h2 className={`{${market} `}>{title}ing </h2>
              </td>
              <td>
                <h2 className={market}>{formatAmt(pendingAmt)}</h2>
              </td>
            </tr>
            <tr className="righty">
              <td>
                <h2 className={`${market} label`}>Remaining </h2>
              </td>
              <td>
                <h2 className={market}>
                  {formatAmt(Number(item?.available) - pendingAmt)}
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="body">
          <table className="trade-entry" style={{display}}>
            <thead>
              <tr>
                <th colSpan="6">
                  {maxRows - trades.length >= small &&
                    <button className="small plus_or_minus add_rows" aria-label="Add one more row"
                      onClick={() => addRow(small)}
                    >+ {small}
                    </button>}
                  {maxRows - trades.length >= large &&
                    <button className="small plus_or_minus add_rows" aria-label="Add 5 more rows"
                      onClick={() => addRow(large)}
                    >+ {large}
                    </button>}
                  <button className="danger small plus_or_minus" aria-label="remove last row"
                    onClick={() => removeRow(small)}
                  >- {small}
                  </button>
                  <button className="danger small plus_or_minus" aria-label="remove last 5 rows"
                    onClick={() => removeRow(large)}
                  >- {large}
                  </button>
                </th>
              </tr>
              <tr>
                <th className={`${market} label`}>&nbsp;&nbsp;{market}</th>
                <th className="label righty">Qty</th>
                <th className="label">Price</th>
                <th className="label">+ / -</th>
                <th className="label">Total</th>
                <th className="label">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, i) => {
                return (
                  <TradingTableRow
                    error={errors[trade.ref_id]}
                    index={i + 1}
                    key={trade.ref_id}
                    marketPrice={Number(marketPrice)}
                    trade={trade}
                  />
                );
              })}
            </tbody>
            <tfoot>
              <tr className={`${market} righty`}>
                <td />
                <td className="table-total">{formatNumber(totalQty)}</td>
                <td className="table-total" colSpan="3">${commasForThousands(totalPrice.toFixed(2))}</td>
                <td>&nbsp;</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <ErrorArea errors={errors} />
    </div>
  );
}

TradingTable.propTypes = {
  addRow: func,
  checkTotalError: func,
  errors: errorsType,
  marketPrice: string,
  maxRows: number,
  removeRow: func,
  title: string,
  trades: arrayOf(tradeType),
};

export default TradingTable;
