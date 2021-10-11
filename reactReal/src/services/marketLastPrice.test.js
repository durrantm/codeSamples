import { MOCKED_TICKERS } from 'paxos_mock_data';
import marketLastPrice from './marketLastPrice';
import axios from 'axios';

const url = 'https://api.paxos.com/v2/all-markets/ticker';

describe('marketBidPrice service', () => {
  jest.mock('axios');

  beforeEach(() => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: MOCKED_TICKERS,
      });
    });
  });

  it('returns the correct bid price info for a successful request', async () => {
    expect(await marketLastPrice()).toEqual([
      {
        lastPrice: '9273.75',
        url: url,
        currency: 'BTC',
      },
      {
        lastPrice: '137.75',
        url: url,
        currency: 'ETH',
      },
    ]);
  });
});

describe('marketPrice service bad path', () => {
  jest.mock('axios');

  beforeEach(() => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: {tickers: [{ market: 'BTCUSD', snapshot_at: MOCKED_TICKERS.tickers[0].snapshot_at }]},
      });
    });
  });

  it('handles the case of a missing bid', async () => {
    expect(await marketLastPrice()).toEqual([
      {
        lastPrice: '',
        url: url,
        currency: 'BTC',
      },
    ]);
  });
});

describe('marketPrice service rejected', () => {
  jest.mock('axios');

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      return Promise.reject({
        response: {
          data: {
            description: 'something broke',
          },
          config: { url },
        },
      });
    });
  });

  it('handles API errors', async () => {
    await expect(marketLastPrice('oops')).rejects.toEqual(
      Error('something broke')
    );
  });
});
