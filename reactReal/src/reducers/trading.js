import { v4 as uuid } from 'uuid';
import { marketsTrading } from '../shared.constants';
import * as t from '../actionTypes/trading';
import dollars from '../util/dollars';
import commaForThousands from '../util/commaForThousands';
import formatNumber from '../util/formatNumber';

const INITIAL_TRADE_LENGTH = 5;

const createTrades = ({ num = INITIAL_TRADE_LENGTH, side }) => Array.from(
  { length: num },
  () => ({ ref_id: uuid(), side, base_amount: '', price: '' })
);

export const initialState = {
  trades: {
    BUY: [],
    SELL: []
  },
  errors: {
    BUY: {},
    SELL: {},
  },
  name: '',
  currency: marketsTrading[0],
  sendingTrades: false
};

export const initializer = state => ({
  ...state,
  trades: {
    BUY: createTrades({ side: 'BUY' }),
    SELL: createTrades({ side: 'SELL' })
  },
  errors: {
    BUY: {},
    SELL: {}
  }
});

const tradingReducer = (state, action) => {
  switch (action.type) {
  case t.ADD_ROWS: {
    const { num, side } = action.payload;
    return {
      ...state,
      trades: {
        ...state.trades,
        [side]: [...state.trades[side], ...createTrades({ num, side })]
      }
    };
  }
  case t.REMOVE_ROWS: {
    const { num, side } = action.payload;
    const errorsBySideCopy = { ...state.errors[side] };
    const idsToRemove = new Set(state.trades[side].slice(-num).map(({ ref_id }) => ref_id));
    for (const ref_id in errorsBySideCopy) {
      if (idsToRemove.has(ref_id)) {
        delete errorsBySideCopy[ref_id];
      }
    }
    return {
      ...state,
      trades: {
        ...state.trades,
        [side]: state.trades[side].slice(0, -num)
      },
      errors: {
        ...state.errors,
        [side]: errorsBySideCopy
      }
    };
  }
  case t.REMOVE_ROWS_BY_UUID: {
    const { uuids, side } = action.payload;
    const errorsBySideCopy = { ...state.errors[side] };
    for (const ref_id in errorsBySideCopy) {
      if (uuids.has(ref_id)) {
        delete errorsBySideCopy[ref_id];
      }
    }
    return {
      ...state,
      trades: {
        ...state.trades,
        [side]: state.trades[side].filter(({ ref_id }) => !uuids.has(ref_id))
      },
      errors: {
        ...state.errors,
        [side]: errorsBySideCopy
      }
    };
  }
  case t.SET_TRADE_NAME: {
    return {
      ...state,
      name: action.payload
    };
  }
  case t.SET_TRADE_CURRENCY: {
    return {
      ...state,
      trades: {
        BUY: createTrades({ side: 'BUY' }),
        SELL: createTrades({ side: 'SELL' })
      },
      errors: {
        BUY: {},
        SELL: {}
      },
      currency: action.payload
    };
  }
  case t.EDIT_TRADE: {
    const { ref_id, side, idx, name, value } = action.payload;
    const tradesCopy = [...state.trades[side]];
    tradesCopy[idx] = { ...tradesCopy[idx], [name]: value };
    const errorsCopy = {
      ...state.errors,
      [side]: {
        ...state.errors[side],
        [ref_id]: {
          ...state.errors[side][ref_id]
        }
      }
    };
    delete errorsCopy[side][ref_id][name];
    if (Object.keys(errorsCopy[side][ref_id]).length === 0) {
      delete errorsCopy[side][ref_id];
    }
    return {
      ...state,
      trades: {
        ...state.trades,
        [side]: tradesCopy
      },
      errors: errorsCopy
    };
  }
  case t.SET_TRADE_ERROR: {
    const { trade, bounds, currentPrice } = action.payload;
    const { ref_id, side, base_amount, price } = trade;
    const { priceMin, priceMax, qtyMin, qtyMax } = bounds;
    const tradeErrors = {};
    const baseAsNum = Number(base_amount);
    const priceAsNum = Number(price);
    if (Number.isNaN(baseAsNum)) {
      tradeErrors.base_amount = `${base_amount} is not a valid number`;
    } else if (baseAsNum && baseAsNum < qtyMin) {
      tradeErrors.base_amount = `Quantity of ${base_amount} cannot be less than ${qtyMin}`;
    } else if (baseAsNum && baseAsNum > qtyMax) {
      tradeErrors.base_amount = `Quantity of ${base_amount} cannot be greater than ${qtyMax}`;
    }
    if (Number.isNaN(priceAsNum)) {
      tradeErrors.price = `${price} is not a valid number`;
    } else if (priceAsNum && priceAsNum < priceMin) {
      tradeErrors.price = `Price of ${price} is less than ${priceMin}`;
    } else if (priceAsNum && priceAsNum > priceMax) {
      tradeErrors.price = `Price of ${price} is greater than ${priceMax}`;
    } else if (priceAsNum && side === 'BUY' && priceAsNum > currentPrice) {
      tradeErrors.price = `Buy price of ${dollars(price)} is greater than the market price of $${
        commaForThousands(currentPrice.toFixed(2))}`;
    } else if (priceAsNum && side === 'SELL' && priceAsNum < currentPrice) {
      tradeErrors.price = `Sell price of ${dollars(price)} is less than the market price of $${
        commaForThousands(currentPrice.toFixed(2))}`;
    }
    const sideErrors = { ...state.errors[side] };
    if (Object.keys(tradeErrors).length > 0) {
      sideErrors[ref_id] = tradeErrors;
    } else {
      delete sideErrors[ref_id];
    }
    return {
      ...state,
      errors: {
        ...state.errors,
        [side]: sideErrors
      }
    };
  }
  case t.SET_TOTAL_ERROR: {
    const { available, total, inDollars } = action.payload;
    const side = inDollars ? 'BUY' : 'SELL';
    const sideErrors = { ...state.errors[side] };
    if (available >= total) {
      delete sideErrors.total;
    } else {
      const prefix = inDollars ? '$' : '';
      const numDigits = inDollars ? 2 : 6;
      const formattedAvail = `${prefix}${commaForThousands(formatNumber(available, numDigits))}`;
      const formattedTotal = `${prefix}${commaForThousands(formatNumber(total, numDigits))}`;
      sideErrors.total = `Available balance of ${
        formattedAvail
      } is insufficient to place trade(s) totaling ${formattedTotal}`;
    }
    return {
      ...state,
      errors: {
        ...state.errors,
        [side]: sideErrors
      }
    };
  }
  case t.FILL_TRADES_TO_MIN_LENGTH: {
    return {
      ...state,
      trades: {
        BUY: [
          ...state.trades.BUY,
          ...createTrades({ side: 'BUY', num: INITIAL_TRADE_LENGTH - state.trades.BUY.length })
        ],
        SELL: [
          ...state.trades.SELL,
          ...createTrades({ side: 'SELL', num: INITIAL_TRADE_LENGTH - state.trades.SELL.length })
        ],
      }
    };
  }
  case t.RESET_TRADES: {
    return {
      ...state,
      trades: {
        BUY: createTrades({ side: 'BUY' }),
        SELL: createTrades({ side: 'SELL' })
      },
      errors: {
        BUY: {},
        SELL: {}
      }
    };
  }
  case t.SET_SENDING_TRADES: {
    return {
      ...state,
      sendingTrades: action.payload
    };
  }
  default:
    console.warn(
      `No action matches '${action.type}', state will not be changed.`
    );
    return state;
  }
};

export default tradingReducer;
