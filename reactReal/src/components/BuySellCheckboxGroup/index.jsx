import { useCallback } from 'react';
import usePageSettings from '../../hooks/usePageSettings';
import { buySellTypeFilter } from '../../shared.constants';
import { shape, string } from 'prop-types';

function BuySellCheckboxGroup() {
  const {buySellFilter, toggleBuySellFilter} = usePageSettings();
  const handleChange = useCallback(filter => () => toggleBuySellFilter(filter), []);
  return (
    <fieldset className="buy-sell-filter-fieldset">
      {buySellTypeFilter.map(filter => {
        const classes = `${filter} chkbox_label`;
        return (
          <label className={classes} key={filter}
            aria-label={`Filter by ${filter}`}
          >
            <input
              type="checkbox"
              value={filter}
              className="show-currency"
              checked={buySellFilter.includes(filter)}
              onChange={handleChange(filter)}
              data-testid={`${filter}_checkbox`}
            />
            {filter}
          </label>
        );
      })
      }
    </fieldset>
  );
}
BuySellCheckboxGroup.propTypes = {
  context: shape({context: string})
};

export default BuySellCheckboxGroup;
