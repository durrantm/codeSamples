import parseDate from '../../../util/parseDate';
import MarketPriceRow from './MarketPriceRow';
import dayjs from 'dayjs';

interface MarketPrices{
  prices: {
  BTC: number;
  ETH: number;
  LTC: number;
  }
}

const Markets = ({ prices } : MarketPrices) => {
  return (
    <>
      <h2 id="markets">Markets </h2>
      <table className="markets" id="markets">
        <tbody>
          <tr>
            <td colSpan={2}>
              &nbsp;
              <span className={'time-now'}>
                &nbsp;
                {parseDate(new Date())}&nbsp;
                {dayjs(new Date()).format('HH:mm:ss')}
              </span>
              &nbsp;
            </td>
          </tr>
          <MarketPriceRow asset={'BTC'} price={prices.BTC} />
          <MarketPriceRow asset={'ETH'} price={prices.ETH} />
          <MarketPriceRow asset={'LTC'} price={prices.LTC} />
        </tbody>
      </table>
    </>
  );
};

export default Markets;
