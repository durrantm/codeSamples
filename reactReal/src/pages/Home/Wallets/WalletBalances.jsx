import Asset from './Asset';
import { pricesType, walletType } from '../types';

const WalletBalances = ({ wallet, prices }) => {
  return (
    wallet?.items?.map(item => {
      const bidPrice = prices[item.asset] || 1;
      return (
        ['USD', ...Object.keys(prices)].includes(item.asset) &&
          <Asset item={item} bidPrice={String(bidPrice)} key={item.asset} />
      );
    })
  || null);
};

WalletBalances.propTypes = {
  prices: pricesType,
  wallet: walletType
};

export default WalletBalances;
