import { useContext, useMemo, useEffect } from 'react';
import { WalletAndPricesContext } from '../providers/WalletAndPricesProvider';
import useAPIError from './useAPIError';

function useWalletAndPrices() {
  const { bidPrices, walletResponse, bidError, walletError } = useContext(
    WalletAndPricesContext
  );
  const { addError, removeError } = useAPIError();

  useEffect(() => {
    if (bidError) {
      addError(bidError);
    } else if (bidPrices && bidPrices.length > 0) {
      removeError(bidPrices[0].url);
    }
  }, [bidPrices, bidError]);

  useEffect(() => {
    if (walletError) {
      addError(walletError);
    } else if (walletResponse) {
      removeError(walletResponse.config.url);
    }
  }, [walletResponse, walletError]);

  const bidPricesWithoutBCH = bidPrices.filter(price => price.currency !== 'BCH');

  return {
    bidPrices,
    bidPricesTrading: useMemo(() => bidPricesWithoutBCH, [bidPrices]),
    wallet: walletResponse?.data,
  };
}

export default useWalletAndPrices;
