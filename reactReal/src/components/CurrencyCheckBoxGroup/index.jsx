import { useCallback } from 'react';
import usePageSettings from '../../hooks/usePageSettings';
import { marketsTrading } from '../../shared.constants';
import currency from '../../util/currency';
import { shape, string } from 'prop-types';

function CurrencyCheckboxGroup() {
  const { activeMarkets, toggleMarket } = usePageSettings();
  const handleChange = useCallback(market => () => toggleMarket(market), []);
  return (
    <fieldset>
      {marketsTrading.map(market => {
        const classes = `${market.substring(0, 3)} chkbox_label`;
        return (
          <label className={classes} key={market}
            aria-label={`Filter by ${currency(market)}`}
          >
            <input
              type="checkbox"
              value={market}
              className="show-currency"
              checked={activeMarkets.includes(market)}
              onChange={handleChange(market)}
              data-testid="checkbox"
            />
            {currency(market)}
          </label>
        );
      })
      }
    </fieldset>
  );
}
CurrencyCheckboxGroup.propTypes = {
  context: shape({ context: string })
};

export default CurrencyCheckboxGroup;
