import { itBitHost } from '../urls.constant';
import currency from '../util/currency';

const MOCKED_TICKERS = {
  tickers: [
    {
      market: 'BTCUSD',
      best_bid: {
        price: '9245.25',
        amount: '0.23124212',
      },
      best_ask: {
        price: '9274.00',
        amount: '1.82341000',
      },
      last_execution: {
        price: '9273.75',
        amount: '0.00002341',
      },
      last_day: {
        high: '10425.25',
        low: '8923.50',
        open: '9324.50',
        volume: '1423.12314232',
        start_time: '2020-01-17T18:36:08.737Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      today: {
        high: '10125.25',
        low: '9100.25',
        open: '9502.50',
        volume: '872.12314232',
        start_time: '2020-01-18T00:00:00.000Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      snapshot_at: '2020-01-17T18:36:08.737Z',
    },
    {
      market: 'ETHUSD',
      best_bid: {
        price: '136.25',
        amount: '0.14532168',
      },
      best_ask: {
        price: '138.00',
        amount: '1.72742000',
      },
      last_execution: {
        price: '137.75',
        amount: '0.00003156',
      },
      last_day: {
        high: '136.75',
        low: '135.25',
        open: '135.25',
        volume: '423.67235137',
        start_time: '2020-01-17T18:36:08.737Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      today: {
        high: '135.15',
        low: '134.13',
        open: '134.13',
        volume: '472.12314232',
        start_time: '2020-01-18T00:00:00.000Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      snapshot_at: '2020-01-17T18:36:08.737Z',
    },
    {
      market: 'LTCUSD',
      best_bid: {
        price: '136.25',
        amount: '0.14532168',
      },
      best_ask: {
        price: '138.00',
        amount: '1.72742000',
      },
      last_execution: {
        price: '37.75',
        amount: '0.00003156',
      },
      last_day: {
        high: '136.75',
        low: '135.25',
        open: '135.25',
        volume: '423.67235137',
        start_time: '2020-01-17T18:36:08.737Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      today: {
        high: '135.15',
        low: '134.13',
        open: '134.13',
        volume: '472.12314232',
        start_time: '2020-01-18T00:00:00.000Z',
        end_time: '2020-01-18T18:36:08.737Z',
      },
      snapshot_at: '2020-01-17T18:36:08.737Z',
    },
  ],
};

const generateRandomPrice = (ticker) => {
  let change;
  switch (ticker.market) {
  case 'BTCUSD':
    change = 73.4;
    break;
  case 'ETHUSD':
    change = 14.23;
    break;
  case 'LTCUSD':
    change = 1.478;
    break;
  default:
    change = 1;
    break;
  }

  let price = Number(ticker.last_execution.price);
  price += 1 + change * (Math.random() - 0.5);
  return price;
};

const mockMarketLastPrice = async () => {
  return MOCKED_TICKERS.tickers.map((ticker) => {
    return {
      lastPrice: generateRandomPrice(ticker).toFixed(2),
      url: `${itBitHost}/ticker`,
      currency: currency(ticker.market),
    };
  });
};

export default mockMarketLastPrice;
