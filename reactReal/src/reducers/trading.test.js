import reducer, { initialState, initializer } from './trading';
import * as actions from '../actions/trading';
import { priceLimits } from '../shared.constants';

describe('trading reducer', () => {
  let firstState;

  beforeEach(() => {
    firstState = initializer(initialState);
  });

  it('handles ADD_ROWS for buys', () => {
    const initialBuys = [{ ref_id: '1', side: 'BUY', base_amount: '', price: '' }];
    const numToAdd = 3;
    firstState.trades.BUY = initialBuys;
    expect(reducer(firstState, actions.addRows({ num: numToAdd, side: 'BUY' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        BUY: [...initialBuys, ...Array.from({ length: numToAdd }, () => ({
          ref_id: expect.any(String),
          side: 'BUY',
          base_amount: '',
          price: ''
        }))]
      }
    });
    expect(firstState.trades.BUY).toBe(initialBuys);
    expect(initialBuys.length).toEqual(1);
  });

  it('handles ADD_ROWS for sells', () => {
    const initialSells = [{ ref_id: '1', side: 'SELL', base_amount: '', price: '' }];
    const numToAdd = 2;
    firstState.trades.SELL = initialSells;
    expect(reducer(firstState, actions.addRows({ num: numToAdd, side: 'SELL' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        SELL: [...initialSells, ...Array.from({ length: numToAdd }, () => ({
          ref_id: expect.any(String),
          side: 'SELL',
          base_amount: '',
          price: ''
        }))]
      }
    });
    expect(firstState.trades.SELL).toBe(initialSells);
    expect(initialSells.length).toEqual(1);
  });

  it('handles REMOVE_ROWS for buys', () => {
    const initialBuys = Array.from({ length: 5 }, (_, i) => ({ ref_id: `${i + 1}`, side: 'BUY' }));
    const numToRemove = 3;
    firstState.trades.BUY = initialBuys;
    expect(reducer(firstState, actions.removeRows({ num: numToRemove, side: 'BUY' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        BUY: initialBuys.slice(0, 2)
      }
    });
    expect(firstState.trades.BUY).toBe(initialBuys);
    expect(initialBuys.length).toEqual(5);
  });

  it('handles REMOVE_ROWS for sells', () => {
    const initialSells = Array.from({ length: 5 }, (_, i) => ({ ref_id: `${i + 1}`, side: 'SELL' }));
    const numToRemove = 2;
    firstState.trades.SELL = initialSells;
    expect(reducer(firstState, actions.removeRows({ num: numToRemove, side: 'SELL' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        SELL: initialSells.slice(0, 3)
      }
    });
    expect(firstState.trades.SELL).toBe(initialSells);
    expect(initialSells.length).toEqual(5);
  });

  it('handles removal of old errors with REMOVE_ROWS', () => {
    const numToRemove = 3;
    const { SELL } = firstState.trades;
    const initialErrors = {
      [SELL[1].ref_id]: { price: 'too high', base_amount: 'too low' },
      [SELL[2].ref_id]: { price: 'too low', base_amount: 'too high' },
      [SELL[3].ref_id]: { base_amount: 'also too low' },
      [SELL[4].ref_id]: { price: 'also too high' }
    };
    firstState.errors.SELL = initialErrors;
    const secondState = reducer(firstState, actions.removeRows({ num: numToRemove, side: 'SELL' }));
    expect(secondState.errors.SELL).toEqual({
      [SELL[1].ref_id]: { price: 'too high', base_amount: 'too low' },
    });
    expect(firstState.errors.SELL).toEqual(initialErrors);
  });

  it('handles REMOVE_ROWS_BY_UUID for buys', () => {
    const initialBuys = Array.from({ length: 5 }, (_, i) => ({ ref_id: `${i + 1}`, side: 'BUY' }));
    firstState.trades.BUY = initialBuys;
    expect(reducer(firstState, actions.removeRowsByUUID({ uuids: new Set(['1', '3']), side: 'BUY' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        BUY: [initialBuys[1], ...initialBuys.slice(3)]
      }
    });
    expect(firstState.trades.BUY).toBe(initialBuys);
    expect(initialBuys.length).toEqual(5);
  });

  it('handles REMOVE_ROWS_BY_UUID for sells', () => {
    const initialSells = Array.from({ length: 5 }, (_, i) => ({ ref_id: `${i + 1}`, side: 'SELL' }));
    firstState.trades.SELL = initialSells;
    expect(reducer(firstState, actions.removeRowsByUUID({ uuids: new Set(['1', '5']), side: 'SELL' }))).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        SELL: initialSells.slice(1, 4)
      }
    });
    expect(firstState.trades.SELL).toBe(initialSells);
    expect(initialSells.length).toEqual(5);
  });

  it('handles removal of old errors with REMOVE_ROWS_BY_UUID', () => {
    const { BUY } = firstState.trades;
    const idsToRemove = new Set([BUY[0].ref_id, BUY[2].ref_id]);
    const initialErrors = {
      [BUY[0].ref_id]: { price: 'too high', base_amount: 'too low' },
      [BUY[1].ref_id]: { price: 'too low', base_amount: 'too high' },
      [BUY[2].ref_id]: { base_amount: 'also too low' },
    };
    firstState.errors.BUY = initialErrors;
    const secondState = reducer(firstState, actions.removeRowsByUUID({ uuids: idsToRemove, side: 'BUY' }));
    expect(secondState.errors.BUY).toEqual({
      [BUY[1].ref_id]: { price: 'too low', base_amount: 'too high' },
    });
    expect(firstState.errors.BUY).toEqual(initialErrors);
  });

  it('handles SET_SENDING_TRADES', () => {
    const secondState = reducer(firstState, actions.setSendingTrades(true));
    expect(secondState).toEqual({ ...firstState, sendingTrades: true });
    expect(firstState.sendingTrades).toBe(false);
    const thirdState = reducer(secondState, actions.setSendingTrades(false));
    expect(thirdState).toEqual(firstState);
    expect(secondState.sendingTrades).toBe(true);
  });

  it('handles SET_TRADE_NAME', () => {
    const secondState = reducer(firstState, actions.setTradeName('mega trade'));
    expect(secondState).toEqual({
      ...firstState,
      name: 'mega trade'
    });
    expect(firstState.name).toEqual('');
  });

  it('handles SET_TRADE_CURRENCY', () => {
    const BUY = Array.from({ length: 7 }, (_, i) => ({ ref_id: `${i + 1}`, side: 'BUY' }));
    const SELL = Array.from({ length: 2 }, (_, i) => ({ ref_id: `${i + 10}`, side: 'SELL' }));
    firstState.trades = { BUY, SELL };
    firstState.errors = { BUY: { 1: 'broken', 5: 'also broken' }, SELL: { 2: 'so broken' } };

    const secondState = reducer(initializer(initialState), actions.setTradeCurrency('ETHUSD'));
    expect(secondState).toEqual({
      ...firstState,
      trades: {
        BUY: Array.from({ length: 5 }, () => ({
          ref_id: expect.any(String),
          side: 'BUY',
          base_amount: '',
          price: ''
        })),
        SELL: Array.from({ length: 5 }, () => ({
          ref_id: expect.any(String),
          side: 'SELL',
          base_amount: '',
          price: ''
        }))
      },
      errors: {
        BUY: {},
        SELL: {}
      },
      currency: 'ETHUSD'
    });
    expect(firstState.currency).toEqual('BTCUSD');
    expect(firstState.trades.BUY).toHaveLength(7);
    expect(firstState.trades.SELL).toHaveLength(2);
    expect(Object.keys(firstState.errors.BUY)).toHaveLength(2);
    expect(Object.keys(firstState.errors.SELL)).toHaveLength(1);
  });

  it('handles EDIT_TRADE with no existing errors', () => {
    const secondState = reducer(firstState, actions.editTrade({
      ref_id: firstState.trades.BUY[0].ref_id,
      side: 'BUY',
      idx: 0,
      name: 'price',
      value: '100'
    }));
    expect(secondState).toEqual({
      ...firstState,
      trades: {
        ...firstState.trades,
        BUY: [
          {
            ...firstState.trades.BUY[0],
            price: '100'
          },
          ...firstState.trades.BUY.slice(1)
        ]
      }
    });
    expect(firstState.trades.BUY[0].price).toEqual('');
  });

  it('handles EDIT_TRADE with many existing errors', () => {
    const errors = {
      base_amount: 'nope',
      price: 'also nope'
    };
    const { ref_id } = firstState.trades.BUY[4];
    firstState.errors.BUY[ref_id] = errors;
    const secondState = reducer(firstState, actions.editTrade({
      ref_id,
      side: 'BUY',
      idx: 4,
      name: 'price',
      value: '100'
    }));
    expect(secondState.errors.BUY[ref_id]).toEqual({ base_amount: 'nope' });
    expect(firstState.errors.BUY[ref_id]).toEqual(errors);
  });

  it('handles EDIT_TRADE with one error that gets fixed', () => {
    const errors = {
      base_amount: 'nope',
    };
    const { ref_id } = firstState.trades.BUY[2];
    firstState.errors.BUY[ref_id] = errors;
    const secondState = reducer(firstState, actions.editTrade({
      ref_id,
      side: 'BUY',
      idx: 2,
      name: 'base_amount',
      value: '0.1'
    }));
    expect(secondState.errors.BUY[ref_id]).toBeUndefined();
    expect(firstState.errors.BUY[ref_id]).toEqual(errors);
  });

  it('handles RESET_TRADES', () => {
    const initialErrors = { BUY: { 1: 'broken' }, SELL: {}};
    firstState.trades = { BUY: [], SELL: [{}] };
    firstState.errors = initialErrors;
    const secondState = reducer(firstState, actions.resetTrades());
    expect(secondState.trades.BUY).toHaveLength(5);
    expect(secondState.trades.SELL).toHaveLength(5);
    expect(firstState.trades.BUY).toHaveLength(0);
    expect(firstState.trades.SELL).toHaveLength(1);
    expect(secondState.errors).toEqual({ BUY: {}, SELL: {} });
    expect(firstState.errors).toEqual(initialErrors);
  });

  it('handles FILL_TRADES_TO_MIN_LENGTH', () => {
    firstState.trades.BUY = firstState.trades.BUY.slice(0, 2);
    firstState.trades.SELL.push({ ref_id: 'anotherone' });

    const secondState = reducer(firstState, actions.fillTradesToMinLength());
    expect(secondState.trades.BUY.slice(0, 2)).toEqual(firstState.trades.BUY);
    expect(secondState.trades.BUY).toHaveLength(5);
    expect(secondState.trades.SELL).toEqual(firstState.trades.SELL);
  });

  it('handles SET_TRADE_ERROR for invalid data', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: 'ack', base_amount: 'nope' },
      bounds: priceLimits.BTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'ack is not a valid number',
        base_amount: 'nope is not a valid number'
      }
    });
  });

  it('handles SET_TRADE_ERROR for BTC amounts too small', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '300', base_amount: '0.00000001' },
      bounds: priceLimits.BTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 300 is less than 1000',
        base_amount: 'Quantity of 0.00000001 cannot be less than 0.000001'
      }
    });
  });

  it('handles SET_TRADE_ERROR for ETH amounts too small', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '50', base_amount: '0.00000001' },
      bounds: priceLimits.ETH,
      currentPrice: 2000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 50 is less than 100',
        base_amount: 'Quantity of 0.00000001 cannot be less than 0.000001'
      }
    });
  });

  it('handles SET_TRADE_ERROR for LTC amounts too small', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '5', base_amount: '0.00000001' },
      bounds: priceLimits.LTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 5 is less than 10',
        base_amount: 'Quantity of 0.00000001 cannot be less than 0.000001'
      }
    });
  });

  it('handles SET_TRADE_ERROR for BTC amounts too large', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '2000000', base_amount: '11' },
      bounds: priceLimits.BTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 2000000 is greater than 1000000',
        base_amount: 'Quantity of 11 cannot be greater than 10'
      }
    });
  });

  it('handles SET_TRADE_ERROR for ETH amounts too large', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '100000', base_amount: '200' },
      bounds: priceLimits.ETH,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 100000 is greater than 50000',
        base_amount: 'Quantity of 200 cannot be greater than 100'
      }
    });
  });

  it('handles SET_TRADE_ERROR for LTC amounts too large', () => {
    const { ref_id, side } = firstState.trades.BUY[0];
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side, price: '9000', base_amount: '2000' },
      bounds: priceLimits.LTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Price of 9000 is greater than 8000',
        base_amount: 'Quantity of 2000 cannot be greater than 1000'
      }
    });
  });

  it('handles SET_TRADE_ERROR for market price errors', () => {
    const { ref_id } = firstState.trades.BUY[0];
    const buyState = reducer(firstState, actions.setTradeError({
      trade: { ref_id, side: 'BUY', price: '40000', base_amount: '1' },
      bounds: priceLimits.BTC,
      currentPrice: 30000
    }));
    expect(buyState.errors.BUY).toEqual({
      [ref_id]: {
        price: 'Buy price of $40,000 is greater than the market price of $30,000.00',
      }
    });
    const { ref_id: sell_ref_id } = firstState.trades.BUY[0];
    const sellState = reducer(firstState, actions.setTradeError({
      trade: { ref_id: sell_ref_id, side: 'SELL', price: '20000', base_amount: '1' },
      bounds: priceLimits.BTC,
      currentPrice: 30000
    }));
    expect(sellState.errors.SELL).toEqual({
      [ref_id]: {
        price: 'Sell price of $20,000 is less than the market price of $30,000.00',
      }
    });
  });

  it('handles SET_TRADE_ERROR elimination of old errors', () => {
    const [firstBuy, secondBuy] = firstState.trades.BUY;
    const firstErrors = {
      [firstBuy.ref_id]: { price: 'bogus', base_amount: 'also bogus' },
      [secondBuy.ref_id]: { price: 'bogus here too' }
    };
    const secondErrors = {
      [firstBuy.ref_id]: { price: 'Price of 300 is less than 1000' },
      [secondBuy.ref_id]: { price: 'bogus here too' }
    };
    const thirdErrors = {
      [firstBuy.ref_id]: { price: 'Price of 300 is less than 1000' },
    };
    firstState.errors.BUY = firstErrors;
    const secondState = reducer(firstState, actions.setTradeError({
      trade: { ref_id: firstBuy.ref_id, side: 'BUY', price: '300', base_amount: '1' },
      bounds: priceLimits.BTC,
      currentPrice: 10000
    }));
    expect(secondState.errors.BUY).toEqual(secondErrors);
    const thirdState = reducer(secondState, actions.setTradeError({
      trade: { ref_id: secondBuy.ref_id, side: 'BUY', price: '5000', base_amount: '1' },
      bounds: priceLimits.BTC,
      currentPrice: 10000
    }));
    expect(thirdState.errors.BUY).toEqual(thirdErrors);
    expect(secondState.errors.BUY).toEqual(secondErrors);
    expect(firstState.errors.BUY).toEqual(firstErrors);
  });

  it('handles SET_TOTAL_ERROR for buys', () => {
    const secondState = reducer(firstState, actions.setTotalError({
      available: 100,
      total: 200,
      inDollars: true
    }));
    expect(secondState.errors).toEqual({
      SELL: {},
      BUY: {
        total: 'Available balance of $100.00 is insufficient to place trade(s) totaling $200.00'
      }
    });
    expect(firstState.errors).toEqual({
      BUY: {},
      SELL: {}
    });
  });

  it('handles SET_TOTAL_ERROR for sells', () => {
    const secondState = reducer(firstState, actions.setTotalError({
      available: 133.124,
      total: 232.7643,
      inDollars: false
    }));
    expect(secondState.errors).toEqual({
      SELL: {
        total: 'Available balance of 133.124000 is insufficient to place trade(s) totaling 232.764300'
      },
      BUY: {}
    });
    expect(firstState.errors).toEqual({
      BUY: {},
      SELL: {}
    });
  });

  it('handles SET_TOTAL_ERROR clearing old errors', () => {
    firstState.errors.BUY = { total: 'error' };
    const secondState = reducer(firstState, actions.setTotalError({
      available: 200,
      total: 100,
      inDollars: true
    }));
    expect(secondState.errors).toEqual({
      BUY: {},
      SELL: {}
    });
    expect(firstState.errors).toEqual({
      BUY: { total: 'error' },
      SELL: {}
    });
  });

  it('warns if the action type is not recognized', () => {
    jest.spyOn(console, 'warn').mockImplementation();
    expect(reducer(firstState, { type: 'foo' })).toBe(firstState);
    expect(console.warn).toHaveBeenCalledWith('No action matches \'foo\', state will not be changed.');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});