import { createContext, useState, useEffect } from 'react';
import { oneOfType, arrayOf, element } from 'prop-types';
import { cryptoTraderAPI, marketLastPrice } from '../services/config';
import useLocalStorage from '../hooks/useLocalStorage';

export const WalletAndPricesContext = createContext();

const WalletAndPricesProvider = ({ children }) => {
  const [bidPrices, setBidPrices] = useLocalStorage('bidPrices', []);
  const [walletResponse, setWalletResponse] = useState(null);
  const [bidError, setBidError] = useState(null);
  const [walletError, setWalletError] = useState(null);

  const findPriceIndex = (bidPrices, currency) =>
    bidPrices.findIndex((price) => price.currency === currency);

  const getUpdatedPrices = (existingPrices, latestPrices) => {
    if (existingPrices.length === 0){
      return latestPrices;
    }

    const finalBidPrices = [...existingPrices];
    latestPrices.forEach((price) => {
      if (price.lastPrice !== ''){
        const index = findPriceIndex(existingPrices, price.currency);
        finalBidPrices[index] = price;
      }
    });

    return finalBidPrices;
  };

  useEffect(() => {
    async function updatePrices() {
      try {
        const bidPricesFromAPI = await marketLastPrice();
        setBidPrices(existingPrices => getUpdatedPrices(existingPrices, bidPricesFromAPI));
        setBidError(null);
      }
      catch (err) {
        setBidPrices([]);
        setBidError(err);
      }
    }
    async function walletDetails() {
      try {
        const res = await cryptoTraderAPI.wallet_balance();
        setWalletResponse(res);
        setWalletError(null);
      } catch (err) {
        if (err.status === 401 || err.status === 500) {
          err.message = 'You need to be authenticated to use this page';
          setWalletError(err);
          setWalletResponse(null);
          return;
        }
        setWalletError(err);
        setWalletResponse(null);
      }
    }
    walletDetails();
    updatePrices();
    const interval = setInterval(() => {
      updatePrices();
      walletDetails();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <WalletAndPricesContext.Provider
      value={{ bidPrices, walletResponse, bidError, walletError }}
    >
      {children}
    </WalletAndPricesContext.Provider>
  );
};

WalletAndPricesProvider.propTypes = {
  children: oneOfType([arrayOf(element), element]).isRequired,
};

export default WalletAndPricesProvider;
