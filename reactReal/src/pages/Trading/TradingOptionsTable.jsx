import { string } from 'prop-types';
import useTrades from '../../hooks/useTrades';
import { marketsTrading } from '../../shared.constants';
import commaForThousands from '../../util/commaForThousands';
import currencyFormat from '../../util/currency';

function TradingOptionsTable({ currentMarketPrice }) {
  const { name, currency, setTradeName, setTradeCurrency } = useTrades();
  return (
    <table className="trading-options">
      <tbody>
        <tr>
          <td className="righty">
            <h2><label htmlFor="trade-name">Multi Trade Name </label></h2>
          </td>
          <td className="lefty">
            <input
              id="trade-name"
              value={name}
              onChange={setTradeName}
              type="text"
              name="name"
              maxLength="30"
              placeholder="Enter the batch name"
              title="Maximum 25 characters"
            />
          </td>
        </tr>
        <tr>
          <td className="righty">
            <h2><label htmlFor="trade-currency">Currency </label></h2>
          </td>
          <td id="currency-selector" className="lefty">
            <select
              id="trade-currency"
              value={currency}
              onChange={setTradeCurrency}
              name="currency"
              data-testid="currency-select"
            >
              {marketsTrading.map(mkt => {
                return (
                  <option value={mkt} key={mkt} className={currencyFormat(mkt)}>{currencyFormat(mkt)}</option>
                );
              })}
            </select>
          </td>
        </tr>
        <tr>
          <td className="righty">
            <h2>Market Price </h2>
          </td>
          <td className="lefty">
            <h2 id="currency-market-price" className={currencyFormat(currency)}>
              {commaForThousands(currentMarketPrice)}
            </h2>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

TradingOptionsTable.propTypes = {
  currentMarketPrice: string
};

export default TradingOptionsTable;
