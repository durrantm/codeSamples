import CryptoTraderApiService from '../services/crypto-trader-api-service';
import {
  MOCKED_TOKEN_DATA,
  MOCKED_WALLET_BALANCES_WITH_MONEY,
  MOCKED_EXECUTIONS,
  MOCKED_ORDER_HISTORY
} from 'paxos_mock_data';

class MockCryptoTraderApiService extends CryptoTraderApiService {
  async fetchAuthToken() {
    return {
      status: 200,
      token: MOCKED_TOKEN_DATA.access_token,
      url: this.cryptoTraderUrl + this.endpoints.token
    };
  }

  async wallet_balance() {
    return {
      status: 200,
      data: MOCKED_WALLET_BALANCES_WITH_MONEY,
      config: { url: this.cryptoTraderUrl + this.endpoints.wallet_balance }
    };
  }

  async executions(markets, buySellFilter, limit) {
    const filteredItems = MOCKED_EXECUTIONS.items
      .filter(item => markets.includes(item.market) && buySellFilter.includes(item.side))
      .slice(0, limit);
    return {
      status: 200,
      data: {
        totalCount: filteredItems.length,
        items: filteredItems
      },
      config: { url: this.cryptoTraderUrl + this.endpoints.executions }
    };
  }

  async orders(markets, limit) {
    const filteredItems = MOCKED_ORDER_HISTORY.items
      .filter(item => item.status === 'OPEN' && markets.includes(item.market))
      .slice(0, limit);
    return {
      status: 200,
      data: {
        totalCount: filteredItems.length,
        items: filteredItems
      },
      config: { url: this.cryptoTraderUrl + this.endpoints.orders }
    };
  }

  async delete_orders() {
    return Promise.reject({
      response: {
        status: 'offline mode',
        data: {
          error: {
            detail: 'Cannot delete orders in offline mode',
            data: {
              orderIds: []
            }
          }
        },
        config: { url: this.cryptoTraderUrl + this.endpoints.delete_order }
      }
    });
  }

  async create_trades(tradeData) {
    return Promise.reject({
      response: {
        status: 'offline mode',
        data: {
          error: {
            detail: 'Cannot create trades in offline mode',
            data: {
              trades: [],
              rejectedTrades: tradeData
            }
          }
        },
        config: { url: this.cryptoTraderUrl + this.endpoints.trades }
      }
    });
  }
}

export default MockCryptoTraderApiService;
