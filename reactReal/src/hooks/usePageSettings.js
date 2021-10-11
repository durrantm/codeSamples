import { useContext } from 'react';
import { PageSettingsContext } from '../providers/PageSettingsProvider';

function usePageSettings() {
  const {
    activeMarkets,
    toggleMarket,
    limit,
    setLimit,
    buySellFilter,
    toggleBuySellFilter
  } = useContext(PageSettingsContext);
  return {
    activeMarkets,
    toggleMarket,
    limit: Number(limit),
    setLimit,
    buySellFilter,
    toggleBuySellFilter
  };
}

export default usePageSettings;
