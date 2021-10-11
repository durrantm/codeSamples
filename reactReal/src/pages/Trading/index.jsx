import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { cryptoTraderAPI } from '../../services/config';
import useWalletAndPrices from '../../hooks/useWalletAndPrices';
import useAPIError from '../../hooks/useAPIError';
import TradingTable from './TradingTable';
import TradingOptionsTable from './TradingOptionsTable';
import useTrades from '../../hooks/useTrades';

function Trading() {
  const history = useHistory();
  const {
    buyTrades,
    buyErrors,
    currency,
    name,
    sellTrades,
    sellErrors,
    sendingTrades,
    addBuys,
    addSells,
    fillTradesToMinLength,
    removeBuys,
    removeSells,
    removeRowsByUUID,
    resetTrades,
    setSendingTrades
  } = useTrades();
  const { errors: apiErrors, addError, removeError } = useAPIError();
  const { bidPricesTrading } = useWalletAndPrices();
  const currentMarketPrice = useMemo(() => {
    const result = bidPricesTrading.find(priceObj => currency.includes(priceObj.currency));
    return result?.lastPrice;
  }, [bidPricesTrading, currency]);

  const handleSubmit = async (withRedirect = false) => {
    setSendingTrades(true);
    const removeTrades = (trades) => {
      const buyUUIDs = new Set(trades.filter(t => t.side === 'BUY').map(t => t.ref_id));
      const sellUUIDs = new Set(trades.filter(t => t.side === 'SELL').map(t => t.ref_id));
      removeRowsByUUID({ uuids: buyUUIDs, side: 'BUY' });
      removeRowsByUUID({ uuids: sellUUIDs, side: 'SELL' });
    };
    try {
      const res = await cryptoTraderAPI.create_trades({
        name,
        currency,
        multiId: uuid(),
        trades: [
          ...buyTrades.filter(t => t.base_amount > 0 && t.price > 0),
          ...sellTrades.filter(t => t.base_amount > 0 && t.price > 0)
        ]
      });
      removeTrades(res.data.trades);
      removeError(res.config.url);
      if (withRedirect) {
        history.push({
          pathname: '/orders',
          state: { currency }
        });
      }
    } catch (err) {
      const trades = err.response.data?.error?.data?.trades || [];
      removeTrades(trades);
      addError(err);
    }
    fillTradesToMinLength();
    setSendingTrades(false);
  };

  const submitWithRedirect = () => handleSubmit(true);
  const submitNoRedirect = () => handleSubmit(false);

  const showTradingTable = useMemo(() => {
    const authErrors = Object.keys(apiErrors).filter((item) => {
      return item.includes('token') || item.includes('wallet_balance')
        && (apiErrors[item].status === 401 || apiErrors[item].status === 500);
    });
    return authErrors.length === 0;
  }, [apiErrors]);

  const hasErrors = useMemo(() => Object.keys(buyErrors).length + Object.keys(sellErrors).length > 0,
    [buyErrors, sellErrors]
  );

  if (!showTradingTable) return (
    <div className="txt_loading">
      You need to be authenticated to use this page
    </div>
  );
  if (sendingTrades) return (
    <div className="txt_loading">
      Please wait while we submit your trade requests
    </div>
  );

  return (
    <section id="trade-entry">
      <TradingOptionsTable currentMarketPrice={currentMarketPrice} />
      <TradingTable
        addRow={addBuys}
        errors={buyErrors}
        marketPrice={currentMarketPrice}
        removeRow={removeBuys}
        title="Buy"
        trades={buyTrades}
      />
      <TradingTable
        addRow={addSells}
        errors={sellErrors}
        marketPrice={currentMarketPrice}
        removeRow={removeSells}
        title="Sell"
        trades={sellTrades}
      />
      <button
        className="trading-submit"
        onClick={submitNoRedirect}
        disabled={hasErrors}
      >
        Submit
      </button>
      <button
        className="trading-submit"
        onClick={submitWithRedirect}
        disabled={hasErrors}
      >
        Submit &amp; View
      </button>
      <button
        className="trading-clear"
        onClick={resetTrades}
      >
        Clear
      </button>
    </section>
  );
}

export default Trading;
