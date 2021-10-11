import CryptoTraderApiService from './crypto-trader-api-service';
import MockCryptoTraderApiService from '../mocked-data/mock-crypto-trader-api-service';
import trueMarketLastPrice from './marketLastPrice';
import mockMarketLastPrice from '../mocked-data/mock-market-last-price';

let cryptoTraderAPI;
let marketLastPrice;

if (process.env.REACT_APP_OFFLINE_MODE === 'true') {
  cryptoTraderAPI = new MockCryptoTraderApiService();
  marketLastPrice = mockMarketLastPrice;
} else if (process.env.REACT_APP_LOCAL_MODE === 'true') {
  cryptoTraderAPI = new CryptoTraderApiService();
  marketLastPrice = mockMarketLastPrice;
} else {
  cryptoTraderAPI = new CryptoTraderApiService();
  marketLastPrice = trueMarketLastPrice;
}

export { cryptoTraderAPI, marketLastPrice };
