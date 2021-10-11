import { useState, useEffect, useMemo } from 'react';
import useAPIError from '../../hooks/useAPIError';
import useWalletAndPrices from '../../hooks/useWalletAndPrices';
import { cryptoTraderAPI } from '../../services/config';
import Wallets from './Wallets';
import Markets from './Markets';

function Home() {
  const [numAPICalls, setNumAPICalls] = useState(0);
  const [token, setToken] = useState('');
  const { addError, removeError } = useAPIError();
  const { bidPricesTrading, wallet } = useWalletAndPrices();

  useEffect(() => {
    async function authenticate() {
      try {
        const { token, url } = await cryptoTraderAPI.fetchAuthToken();
        setToken(token);
        removeError(url);
      } catch (err) {
        addError(err);
      }
    }
    authenticate();
  }, []);

  useEffect(() => {
    if (token) {
      setNumAPICalls((callTotal) => callTotal + 1);
    }
  }, [bidPricesTrading, token]);

  const prices = useMemo(
    () =>
      bidPricesTrading.reduce((obj, { currency, lastPrice }) => {
        obj[currency] = lastPrice;
        return obj;
      }, {}),
    [bidPricesTrading]
  );

  return (
    <section id="currency-data">
      <section id="markets">
        <Markets prices={prices} />
      </section>
      <section id="wallets">
        <Wallets wallet={wallet} prices={prices} />
        <div id="call-counter">
          API calls: <span className="num-api-calls">{numAPICalls}</span>
        </div>
      </section>
    </section>
  );
}
export default Home;
