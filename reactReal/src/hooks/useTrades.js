import { useContext } from 'react';
import { TradeContext } from '../providers/TradeProvider';

function useTrades() {
  return useContext(TradeContext);
}

export default useTrades;
