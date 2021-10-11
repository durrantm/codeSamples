import * as actions from './trading';
import * as t from '../actionTypes/trading';

describe('Trading page action creators', () => {
  it('addRows', () => {
    expect(actions.addRows({ num: 4, side: 'BUY'})).toEqual({
      type: t.ADD_ROWS,
      payload: { num: 4, side: 'BUY' }
    });
  });

  it('removeRows', () => {
    expect(actions.removeRows({ num: 3, side: 'BUY'})).toEqual({
      type: t.REMOVE_ROWS,
      payload: { num: 3, side: 'BUY' }
    });
  });

  it('removeRowsByUUID', () => {
    expect(actions.removeRowsByUUID({ uuids: new Set(['a', 'b', 'c']), side: 'SELL'})).toEqual({
      type: t.REMOVE_ROWS_BY_UUID,
      payload: { uuids: new Set(['a', 'b', 'c']), side: 'SELL' }
    });
  });

  it('setTradeName', () => {
    expect(actions.setTradeName('foo')).toEqual({
      type: t.SET_TRADE_NAME,
      payload: 'foo'
    });
  });

  it('setTradeCurrency', () => {
    expect(actions.setTradeCurrency('ETHUSD')).toEqual({
      type: t.SET_TRADE_CURRENCY,
      payload: 'ETHUSD'
    });
  });

  it('setSendingTrades', () => {
    expect(actions.setSendingTrades(true)).toEqual({
      type: t.SET_SENDING_TRADES,
      payload: true
    });
  });

  it('editTrade', () => {
    expect(actions.editTrade({ ref_id: 'a', side: 'BUY', idx: 1, name: 'key', value: 'value' })).toEqual({
      type: t.EDIT_TRADE,
      payload: { ref_id: 'a', side: 'BUY', idx: 1, name: 'key', value: 'value' }
    });
  });

  it('resetTrades', () => {
    expect(actions.resetTrades()).toEqual({
      type: t.RESET_TRADES
    });
  });

  it('fillTradesToMinLength', () => {
    expect(actions.fillTradesToMinLength()).toEqual({
      type: t.FILL_TRADES_TO_MIN_LENGTH
    });
  });

  it('setTradeError', () => {
    expect(actions.setTradeError({ trade: 'mock', bounds: 'more mock', currentPrice: '1' })).toEqual({
      type: t.SET_TRADE_ERROR,
      payload: { trade: 'mock', bounds: 'more mock', currentPrice: '1' }
    });
  });

  it('setTotalError', () => {
    expect(actions.setTotalError({ available: 1, total: 2, inDollars: false })).toEqual({
      type: t.SET_TOTAL_ERROR,
      payload: { available: 1, total: 2, inDollars: false }
    });
  });
});
