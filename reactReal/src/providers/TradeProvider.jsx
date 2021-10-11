import { createContext, useCallback, useMemo, useReducer } from 'react';
import { oneOfType, arrayOf, element } from 'prop-types';
import * as actions from '../actions/trading';
import reducer, { initialState, initializer } from '../reducers/trading';

export const TradeContext = createContext();

const TradeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const buyTrades = useMemo(() => state.trades.BUY, [state.trades.BUY]);
  const sellTrades = useMemo(() => state.trades.SELL, [state.trades.SELL]);
  const buyErrors = useMemo(() => state.errors.BUY, [state.errors.BUY]);
  const sellErrors = useMemo(() => state.errors.SELL, [state.errors.SELL]);

  const addBuys = useCallback(num => dispatch(actions.addRows({ num, side: 'BUY' })), []);
  const addSells = useCallback(num => dispatch(actions.addRows({ num, side: 'SELL' })), []);
  const removeBuys = useCallback(num => dispatch(actions.removeRows({ num, side: 'BUY' })), []);
  const removeSells = useCallback(num => dispatch(actions.removeRows({ num, side: 'SELL' })), []);
  const removeRowsByUUID = useCallback(({ uuids, side }) => dispatch(actions.removeRowsByUUID({ uuids, side })), []);
  const setTradeName = useCallback(e => dispatch(actions.setTradeName(e.target.value)), []);
  const setTradeCurrency = useCallback(e => dispatch(actions.setTradeCurrency(e.target.value)), []);
  const setSendingTrades = useCallback(bool => dispatch(actions.setSendingTrades(bool)), []);
  const editTrade = useCallback(tradeData => dispatch(actions.editTrade(tradeData)), []);
  const resetTrades = useCallback(() => dispatch(actions.resetTrades()), []);
  const fillTradesToMinLength = useCallback(() => dispatch(actions.fillTradesToMinLength()), []);
  const setTradeError = useCallback(tradeInfo => dispatch(actions.setTradeError(tradeInfo)), []);
  const setTotalError = useCallback(totalInfo => dispatch(actions.setTotalError(totalInfo)), []);

  return (
    <TradeContext.Provider value=
      {{
        buyErrors,
        buyTrades,
        sellErrors,
        sellTrades,
        name: state.name,
        currency: state.currency,
        sendingTrades: state.sendingTrades,
        addBuys,
        addSells,
        removeBuys,
        removeSells,
        removeRowsByUUID,
        setTradeName,
        setTradeCurrency,
        setSendingTrades,
        editTrade,
        resetTrades,
        fillTradesToMinLength,
        setTradeError,
        setTotalError
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

TradeProvider.propTypes = {
  children: oneOfType([
    arrayOf(element),
    element
  ]).isRequired
};


export default TradeProvider;
