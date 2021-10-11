import * as t from '../actionTypes/trading';

export const addRows = ({ num, side }) => ({
  type: t.ADD_ROWS,
  payload: { num, side }
});

export const removeRows = ({ num, side }) => ({
  type: t.REMOVE_ROWS,
  payload: { num, side }
});

export const removeRowsByUUID = ({ uuids, side }) => ({
  type: t.REMOVE_ROWS_BY_UUID,
  payload: { uuids, side }
});

export const setTradeName = name => ({
  type: t.SET_TRADE_NAME,
  payload: name
});

export const setTradeCurrency = currency => ({
  type: t.SET_TRADE_CURRENCY,
  payload: currency
});

export const setSendingTrades = bool => ({
  type: t.SET_SENDING_TRADES,
  payload: bool
});

export const editTrade = ({ ref_id, side, idx, name, value }) => ({
  type: t.EDIT_TRADE,
  payload: { ref_id, side, idx, name, value }
});

export const resetTrades = () => ({
  type: t.RESET_TRADES
});

export const fillTradesToMinLength = () => ({
  type: t.FILL_TRADES_TO_MIN_LENGTH
});

export const setTradeError = ({ trade, bounds, currentPrice }) => ({
  type: t.SET_TRADE_ERROR,
  payload: { trade, bounds, currentPrice }
});

export const setTotalError = ({ available, total, inDollars }) => ({
  type: t.SET_TOTAL_ERROR,
  payload: { available, total, inDollars }
});
