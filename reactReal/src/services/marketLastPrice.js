import c from '../util/currency';
import { itBitHost } from '../urls.constant';
import axios from 'axios';
import { markets } from '../shared.constants';

const allowedMarkets = (ticker) => {
  return markets.find(market => market === ticker.market);
};

const marketLastPrice = async () => {
  try {
    const url = `${itBitHost}/ticker`;
    const response = await axios.get(url);
    return (
      response?.data?.tickers?.filter(allowedMarkets).map((ticker) => {
        const bid = Number(ticker.last_execution?.price).toFixed(2);
        return {
          lastPrice: !isNaN(bid) ? bid : '',
          url: url,
          currency: c(ticker.market),
        };
      }) || []
    );
  } catch (err) {
    let formattedError;
    if (err.response) {
      formattedError = new Error(err.response.data.description);
    } else {
      formattedError = new Error(err.message);
    }
    formattedError.url = `${itBitHost}/ticker`;
    throw formattedError;
  }
};

export default marketLastPrice;
