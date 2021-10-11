import axios from 'axios';
import { localHost } from '../urls.constant';

const CRYPTO_TRADER_BE_URL = localHost;
const ENDPOINTS = {
  wallet_balance: '/wallet_balance',
  executions: '/executions',
  orders: '/orders',
  delete_order: '/orders',
  token: '/token',
  trades: '/trades'
};

const MARKETS = {
  ETH_IN_EUR: 'ETHEUR',
  ETH_IN_SGD: 'ETHSGD',
  ETH_IN_USD: 'ETHUSD',
  BTC_IN_EUR: 'BTCEUR',
  BTC_IN_SGD: 'BTCSGD',
  BTC_IN_USD: 'BTCUSD',
  PAXG_IN_USD: 'PAXGUSD',
  BCH_IN_USD: 'BCHUSD',
  LTC_IN_USD: 'LTCUSD',
};

class CryptoTraderApiService {
  constructor() {
    this.cryptoTraderUrl = CRYPTO_TRADER_BE_URL;
    this.endpoints = ENDPOINTS;
    this.markets = MARKETS;
  }

  authTokenFromLS() {
    return sessionStorage.getItem('tokenData');
  }

  async fetchAuthToken() {
    try {
      const response = await axios.get(this.cryptoTraderUrl + this.endpoints.token);
      const token = response.data.access_token;
      sessionStorage.setItem('tokenData', token);
      return { token, url: response.config.url };
    } catch (err) {
      let formattedError;
      if (err.response) {
        const { detail, status } = err.response.data.error;
        formattedError = new Error(detail);
        formattedError.status = status;
        formattedError.url = err.response.config.url;
      } else {
        formattedError = new Error(err.message);
        formattedError.url = err.config.url;
      }
      throw formattedError;
    }
  }

  async getToken() {
    let authToken = this.authTokenFromLS();
    if (!authToken) {
      await this.fetchAuthToken();
      authToken = this.authTokenFromLS();
    }
    return authToken;
  }

  async wallet_balance() {
    const authToken = await this.getToken();
    return axios.get(this.cryptoTraderUrl + this.endpoints.wallet_balance, {
      params: { token: authToken },
    });
  }

  async executions(markets, buySellFilter, limit) {
    const authToken = await this.getToken();
    return axios.get(this.cryptoTraderUrl + this.endpoints.executions, {
      params: { token: authToken, markets, limit, buySellFilter},
    });
  }

  async orders(markets, limit) {
    const authToken = await this.getToken();
    return axios.get(this.cryptoTraderUrl + this.endpoints.orders, {
      params: { token: authToken, markets, limit },
    });
  }

  async delete_orders(orderIdSet) {
    const authToken = await this.getToken();
    return axios.delete(this.cryptoTraderUrl + this.endpoints.delete_order, {
      params: { token: authToken },
      data: { orderIds: [...orderIdSet] }
    });
  }

  async create_trades(tradeData) {
    const authToken = await this.getToken();
    return axios.post(this.cryptoTraderUrl + this.endpoints.trades,
      tradeData,
      { params: { token: authToken }}
    );
  }
}

export default CryptoTraderApiService;
