import { createContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { marketsTrading, numRowsLimits, buySellTypeFilter } from '../shared.constants';
import { oneOfType, arrayOf, element, string } from 'prop-types';

export const PageSettingsContext = createContext();

const PageSettingsProvider = ({ children, tradeType }) => {
  const [activeMarkets, setActiveMarkets] = useLocalStorage(`${tradeType}_currencies`, marketsTrading);
  const [limit, setLimit] = useLocalStorage(`${tradeType}_limit`, numRowsLimits[0]);
  const [buySellFilter, setBuySellFilter] = useLocalStorage(`${tradeType}_buySellFilter`, buySellTypeFilter);
  const toggleMarket = useCallback(market => {
    setActiveMarkets(oldMarkets => {
      const nextMarkets = new Set(oldMarkets);
      if (nextMarkets.has(market)) nextMarkets.delete(market);
      else nextMarkets.add(market);
      return [...nextMarkets];
    });
  }, []);
  const toggleBuySellFilter = useCallback(filter => {
    setBuySellFilter(oldFilters => {
      const nextFilters = new Set(oldFilters);
      if (nextFilters.has(filter)) nextFilters.delete(filter);
      else nextFilters.add(filter);
      return [...nextFilters];
    });
  }, []);

  return (
    <PageSettingsContext.Provider value={{
      activeMarkets,
      toggleMarket,
      limit,
      setLimit,
      buySellFilter,
      toggleBuySellFilter}}
    >
      {children}
    </PageSettingsContext.Provider>
  );
};

PageSettingsProvider.propTypes = {
  children: oneOfType([arrayOf(element), element]).isRequired,
  tradeType: string
};

export default PageSettingsProvider;
